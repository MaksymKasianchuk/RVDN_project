import { data } from "jquery";
import API_URL from "../api";
import notifications from "../notifications";

function addNewPerson(){
    const personsArr  = [];
    let userToken = sessionStorage.getItem('token');
    if (userToken){
        let getAllPersonsRequest = $.ajax({
            type: "GET",
            url: `${API_URL}persons`,
            crossDomain: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            },
            success: function(data){
                personsArr.push(...data);
                // console.log(personsArr);
            },
            error: function (data) {
            //    console.log(data);
            }
        });
    
        getAllPersonsRequest.done(function(){
            $('input[name=newperson-relationship]').each(function(){
                $(this).on('input', function(){
                    if($(this).val().length > 3){
                        personsArr.map(item=>{
                            let fullname = item.fullName;
                            if (fullname.includes($(this).val())){
                                $('.relationship-search').html(`
                                    <p calss="maby-rel-pers">${fullname}</p>
                                `);
                            }
                            if (fullname === $(this).val()){
                                $(this).parents('.newperson-relationship-wrapper').attr('data-pers-rel-id', item.id);
                            }
                        });
                    } else {
                        $('.relationship-search').html('');
                    }
                });
              
            });
    
        })
    }

    //-----------add-relative-btn-in-fom
    // $('.add-relative-btn').on('click', function(e){
    //     const strTpl = `
    //         <div class="col-12 col-md-6 col-lg-4 newperson-relationship-wrapper">
    //             <div class="form-group">
    //                 <label class="form-label">ПІБ</label>
    //                 <input type="text" name="newperson-relationship" id="" value="">
    //             </div>
    //             <div class="form-group newperson-relationship-level">
    //                 <label class="form-label">Рівень зв'язку</label>
    //                 <select name="newperson-relationship-level" id="">
    //                     <option value="5">Чоловік</option>
    //                     <option value="4">Дружина</option>
    //                     <option value="3">Брат</option>
    //                     <option value="2">Сестра</option>
    //                     <option value="1">Друг</option>
    //                     <option value="0" selected>Інше...</option>
    //                 </select>
    //             </div>
    //         </div>
    //     `;
    //     $(this).parents('.add-relateve-col').before(strTpl);
    // });

    $('.add-new-person-btn').on('click', function(e){
        e.preventDefault();
            if(!$('#newperson-pasport-date').val()){
                notifications.errorNotif('Некоректно введена дата видачі!');
                return;
            }
            if(!$('#newperson-birthday').val()){
                notifications.errorNotif('Некоректно введена дата народження!');
                return;
            }
            let userToken = sessionStorage.getItem('token');
            let fullName =  $('#newperson-name').val(); 
            let documentTypeId = Number($('input[name="newperson-pasport-type"]:checked').val());
            let documentSeries = $('#newperson-pasport-ser').val();
            let documentNumber =   Number($('#newperson-pasport-number').val());
            let documentIssueDate =  new Date($('#newperson-pasport-date').val());
            let issuingAuthority = 0; //???
            let birthDate = new Date($('#newperson-birthday').val());
            let phoneNumber =  $('#newperson-phone').val();
            let hasChildren = false;
            let registrationAddress = $('#newperson-reg-address').val();
            let livingAddress =  $('#newperson-home-address').val();
            let workingPlace = $('#newperson-work').val();
            let socialSecurityId = 1; 
            if(!fullName || !documentTypeId || !documentSeries || !documentNumber || !documentIssueDate || !birthDate || !phoneNumber || !registrationAddress || !livingAddress || !workingPlace){
                notifications.errorNotif('Не заповнені всі поля форми!');
                return;
            }
            if(!isPhone(phoneNumber)){
                notifications.errorNotif('Телефонний номер введено не коректно!');
                return;
            }
            if($('#newperson-children-yes').is(':checked')) { hasChildren = true; } 
            else { hasChildren = false; }
            switch($('#newperson-money').val()){
                case 'Низький':
                    socialSecurityId = 1;
                    break;
                case 'Середній':
                    socialSecurityId = 2;
                    break;
                case 'Високий':
                    socialSecurityId = 3;
                    break;
            }
            console.log(socialSecurityId);

            const data = {
                "fullName": fullName,
                "documentTypeId": documentTypeId,
                "documentSeries": documentSeries,
                "documentNumber": documentNumber,
                "issuingAuthority": issuingAuthority,
                "documentIssueDate" : documentIssueDate.toISOString(),
                "birthDate": birthDate.toISOString(),
                "phoneNumber": phoneNumber,
                "hasChildren": hasChildren,
                "registrationAddress": registrationAddress,
                "livingAddress": livingAddress,
                "workingPlace": workingPlace,
                "socialSecurityId": socialSecurityId
            };
            console.log(data);
            if(userToken){
                let newpersonId;
                // let relId = $('.newperson-relationship-wrapper').attr('data-pers-rel-id');
                let createPersonRequest = $.ajax({
                    type: "POST",
                    url: `${API_URL}persons`,
                    crossDomain: true,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
                    },
                    data: JSON.stringify(data),
                    success: function(data){
                        // console.log(data);
                        newpersonId = data;

                        $('#newperson-name').val('');
                        $('#newperson-pasport-ser').val('');   
                        $('#newperson-pasport-number').val('');
                        $('#newperson-pasport-date').val('');
                        $('#newperson-birthday').val('');
                        $('#newperson-phone').val('');
                        $('#newperson-reg-address').val('');
                        $('#newperson-home-address').val('');
                        $('#newperson-work').val('');
                        notifications.succsessNotif('Запис про особу успішно створено');
                    },
                    error: function (data) {
                        notifications.errorNotif(data.responseJSON);
                        //console.log(data);
                    }
                });

                // if(relId && newpersonId){
                //     // createPersonRequest.done( function(){
                //         let data = {              
                //             "personRelationships": [
                //                 {
                //                 "relationshipPersonId": Number(relId),
                //                 "relationshipTypeId": Number($('.newperson-relationship-level').val())
                //                 }
                //             ]
                //         }
                //         let createRelRequest = $.ajax({
                //             type: "POST",
                //             url: `${API_URL}persons/${newpersonId}/relationships`,
                //             crossDomain: true,
                //             headers: {
                //                 'Access-Control-Allow-Origin': '*',
                //                 'Content-Type': 'application/json',
                //                 'Authorization': `Bearer ${userToken}`,
                //             },
                //             data: JSON.stringify(data),
                //             success: function(data){
                //                 console.log('relship');
                //                 $('#newperson-name').val('');
                //                 $('#newperson-pasport-ser').val('');   
                //                 $('#newperson-pasport-number').val('');
                //                 $('#newperson-pasport-date').val('');
                //                 $('#newperson-birthday').val('');
                //                 $('#newperson-phone').val('');
                //                 $('#newperson-reg-address').val('');
                //                 $('#newperson-home-address').val('');
                //                 $('#newperson-work').val('');
                //             },
                //             error: function (data) {
                //                console.log(data);
                //             }
                //         });
                //     // }
                //     // );
                // }
            }

    });
}
function isPhone(phone) {
    var regex = /\+38[0-9]{10}/;
    return regex.test(phone);
}
export default addNewPerson;