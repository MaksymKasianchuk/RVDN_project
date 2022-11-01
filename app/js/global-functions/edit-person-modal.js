import { data } from "jquery";
import API_URL from "../api";

function editPersonModal(){
    $('.person-card-modal-btn').on('click', function(e){
        e.preventDefault();
        // if(readonly){
        //     $(this).parents('.backdrop').removeClass('show-modal');
        //     $('#person-role').removeAttr('disabled');
        //     // $('#person-children-yes').removeAttr('disabled');
        //     // $('#person-children-no').removeAttr('disabled');
        //     $('#person-name').removeAttr('readonly');
        //     // $('#person-pasport-type-pasport').removeAttr('disabled');
        //     // $('#person-pasport-type-card').removeAttr('disabled');
        //     // $('#person-pasport-type-drive').removeAttr('disabled');
        //     $('#person-pasport-ser').removeAttr('readonly');
        //     $('#person-pasport-number').removeAttr('readonly');
        //     $('#person-pasport-date').removeAttr('readonly');
        //     $('#person-money').removeAttr('disabled');
        //     $('#person-relationship').removeAttr('readonly');
        //     $('#person-birthday').removeAttr('readonly');
        //     $('#person-phone').removeAttr('readonly');
        //     $('#person-reg-address').removeAttr('readonly');
        //     $('#person-home-address').removeAttr('readonly');
        //     $('#person-work').removeAttr('readonly');
        //     $('#person-relationship-level').removeAttr('disabled');
        // } else{
            let id =  $('#person-card-modal').attr('data-person-id');
            let userToken = sessionStorage.getItem('token');
            let fullName =  $('#person-name').val(); 
            let documentTypeId = Number($('input[name="person-pasport-type"]:checked').val());
            let documentSeries = $('#person-pasport-ser').val();
            let documentNumber =   Number($('#person-pasport-number').val());
            let issuingAuthority = 0; //???
            let birthDate;
            let phoneNumber =  $('#person-phone').val();
            let hasChildren = false;
            let registrationAddress = $('#person-reg-address').val();
            let livingAddress =  $('#person-home-address').val();
            let workingPlace = $('#person-work').val();
            let socialSecurityId =  Number($('#person-money').val());

            if($('#person-children-yes').is(':checked')) { hasChildren = true; } 
            else { hasChildren = false; }
            let bd =  new Date($('#person-birthday').val());
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
            if(userToken && id){
                let editPersonRequest = $.ajax({
                    type: "PUT",
                    url: `${API_URL}persons/${id}`,
                    crossDomain: true,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
                    },
                    data: JSON.stringify(data),
                    success: function(data){
                        console.log(data);
                        $('.person-card-modal').removeClass('show-modal');                      
                    },
                    error: function (data) {
                       console.log(data);
                    }
                });
            }
           
        // }

    });
}

export default editPersonModal;
