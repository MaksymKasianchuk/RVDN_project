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
                data.map(item => {
                    personsArr.push({
                        'fullName': item.fullName,
                        'id': item.id,
                        'normalizedName': item.fullName.toLowerCase()
                    });
                });
            },
            error: function (data) {
                //console.log(data);
            }
        });
    
        getAllPersonsRequest.done(function(){
            $('#newperson-relationship-name').on('input', function(){
                if($(this).val().length > 3){
                    personsArr.map(item=>{
                        let fullname = item.fullName;
                        let normalizedNameData =item.normalizedName;
                        let normalizedName = ($(this).val()).toLowerCase();
                        if (normalizedNameData.includes(normalizedName)){
                            $('.relationship-search').html(`
                                <p class="maby-rel-pers">${fullname}</p>
                            `);
                            nameListener(fullname, item.id);
                        }
                    });
                } else {
                    $('.relationship-search').html('');
                }
            });
            function nameListener(fullname, id){
                $('.maby-rel-pers').on('click', function(){
                    $('#newperson-relationship-name').val($(this).text());
                    $('.maby-rel-pers').text('');
                    if (fullname === $('#newperson-relationship-name').val()){
                        $(".newperson-relationship-wrapper").attr('data-pers-rel-id', id);
                    }
                });
            }
        });
    }

    //add relationship
    $('.add-relative-btn').on('click', function(e){
        e.preventDefault();
        let persId = $('.newperson-relationship-wrapper').attr('data-pers-rel-id');
        let relId = $('#newperson-relationship-level').val();
        let persName = $('#newperson-relationship-name').val();
        let relName = $('#newperson-relationship-level>option:selected').text();
        if(!persId){
            notifications.emptyNotif("Додайте вірне ім'я соби у полі зв'язків");
            return;
        }
        let relMarkup = `<div class="col-12 col-md-6 col-lg-4 newpers-rel-item" data-pers-rel-id="${persId}" data-pers-rel-type-id="${relId}">
            <div class="form-group">
                <label class="form-label">ПІБ пов'язаної особи</label>
                <input type="text" name="newperson-rel-name" value="${persName}" readonly>
            </div>
            <div class="form-group">
                <label class="form-label">Рівень зв'язку</label>
                <input type="text" name="newperson-rel-level" value="${relName}" readonly>
            </div>
            <button class="btn delete-rel" type="button">Видалити запис</button>
        </div>`;
        $('.rel-row').append(relMarkup);
        $('#newperson-relationship-name').val('');
        $('.newperson-relationship-wrapper').attr('data-pers-rel-id', '');
        deleteRel();
    });
    function deleteRel(){
        $('.delete-rel').on('click', function(e){
            $(this).parent('.newpers-rel-item').remove();
        });
    }

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
            let socialSecurityId = Number($('#newperson-money').val());
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
                let relPersArr = [];
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
                    }
                });

                
                $('.newpers-rel-item').each(function(){
                    relPersArr.push(
                        {
                            "relationshipPersonId": $(this).attr('data-pers-rel-id'),
                            "relationshipTypeId": $(this).attr('data-pers-rel-type-id')
                        }
                    );
                });
                
                if(relPersArr){
                    let relData = {
                        "personRelationships": relPersArr
                    };
                    createPersonRequest.done(function(data){
                        let recId = data;
                        $.ajax({
                            type: "POST",
                            url: `${API_URL}persons/${recId}/relationships`,
                            crossDomain: true,
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${userToken}`,
                            },
                            data: JSON.stringify(relData),
                            success: function(data){
                                console.log(data);
                                $('.newpers-rel-item').each(function(){
                                    $(this).remove();
                                });
                                $('#newperson-relationship-name').val('');
                            },
                            error: function (data) {
                                notifications.errorNotif(data.responseJSON);
                            }
                        });

                    });
                    
                }
                
               
            }

    });
}
function isPhone(phone) {
    var regex = /\+38[0-9]{10}/;
    return regex.test(phone);
}
export default addNewPerson;