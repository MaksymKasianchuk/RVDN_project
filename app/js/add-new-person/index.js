import { data } from "jquery";
import API_URL from "../api";

function addNewPerson(){
    //-----------add-relative-btn-in-fom
    $('.add-relative-btn').on('click', function(e){
        const strTpl = `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="form-group">
                    <label class="form-label">ПІБ</label>
                    <input type="text" name="newperson-relationship" id="" value="">
                </div>
                <div class="form-group newperson-relationship-level">
                    <label class="form-label">Рівень зв'язку</label>
                    <select name="newperson-relationship-level" id="">
                        <option value="Чоловік">Чоловік</option>
                        <option value="Дружина">Дружина</option>
                        <option value="Брат">Брат</option>
                        <option value="Сестра">Сестра</option>
                        <option value="Інше..." selected>Інше...</option>
                    </select>
                </div>
            </div>
        `;
        $(this).parents('.add-relateve-col').before(strTpl);
    });

    $('.add-new-person-btn').on('click', function(e){
        e.preventDefault();
            let userToken = sessionStorage.getItem('token');
            let fullName =  $('#newperson-name').val(); 
            let documentTypeId = Number($('input[name="newperson-pasport-type"]:checked').val());
            let documentSeries = $('#newperson-pasport-ser').val();
            let documentNumber =   Number($('#person-pasport-number').val());
            let issuingAuthority = 0; //???
            let birthDate;
            let phoneNumber =  $('#newperson-phone').val();
            let hasChildren = false;
            let registrationAddress = $('#newperson-reg-address').val();
            let livingAddress =  $('#newperson-home-address').val();
            let workingPlace = $('#newperson-work').val();
            let socialSecurityId =  Number($('#newperson-money').val());

            if($('#newperson-children-yes').is(':checked')) { hasChildren = true; } 
            else { hasChildren = false; }
            let bd =  new Date($('#newperson-birthday').val());
            birthDate =  bd.toISOString();

            const data = {
                "fullName": fullName,
                "documentTypeId": documentTypeId,
                "documentSeries": documentSeries,
                "documentNumber": documentNumber,
                "issuingAuthority": issuingAuthority,
                "birthDate": birthDate,
                "phoneNumber": phoneNumber,
                "hasChildren": hasChildren,
                "registrationAddress": registrationAddress,
                "livingAddress": livingAddress,
                "workingPlace": workingPlace,
                "socialSecurityId": socialSecurityId
            };
            // console.log(data);
            if(userToken){
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
                        console.log(data);
                        $('#newperson-name').val('');
                        $('#newperson-pasport-ser').val('');   
                        $('#person-pasport-number').val('');
                        $('#newperson-birthday').val('');
                        $('#newperson-phone').val('');
                        $('#newperson-reg-address').val('');
                        $('#newperson-home-address').val('');
                        $('#newperson-work').val('');
                    },
                    error: function (data) {
                       console.log(data);
                    }
                });
            }
           
        // }

    });
}
export default addNewPerson;