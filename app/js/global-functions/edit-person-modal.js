import { data } from "jquery";
import API_URL from "../api";

function editPersonModal(){
    $('.person-card-modal-btn').on('click', function(e){
        e.preventDefault();
        
        let id =  $('#person-card-modal').attr('data-person-id');
        let userToken = sessionStorage.getItem('token');
        let fullName =  $('#person-name').val(); 
        let documentTypeId = Number($('input[name="person-pasport-type"]:checked').val());
        let documentSeries = $('#person-pasport-ser').val();
        let documentNumber =   Number($('#person-pasport-number').val());
        let documentIssueDate =  new Date($('#person-pasport-date').val());
        let issuingAuthority = 0; //???
        let birthDate;
        let phoneNumber =  $('#person-phone').val();
        let hasChildren = false;
        let registrationAddress = $('#person-reg-address').val();
        let livingAddress =  $('#person-home-address').val();
        let workingPlace = $('#person-work').val();
        let socialSecurityId = 1;
        if($('#person-children-yes').is(':checked')) { hasChildren = true; } 
        else { hasChildren = false; }
        
        let bd =  new Date($('#person-birthday').val());
        birthDate =  bd.toISOString();

        switch($('#person-money').val()){
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

        const data = {
            "fullName": fullName,
            "documentTypeId": documentTypeId,
            "documentSeries": documentSeries,
            "documentNumber": documentNumber,
            "issuingAuthority": issuingAuthority,
            "documentIssueDate": documentIssueDate.toISOString(),
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

    });
}

export default editPersonModal;
