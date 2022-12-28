import { data } from "jquery";
import API_URL from "../api";
import notifications from "../notifications";

function editRecordModal(){
    $('.record-card-modal-btn').on('click', function(e){
        e.preventDefault();
        let userToken = sessionStorage.getItem('token');
        let victim_arr = [];
        $('input[name="record-victim"]').each(function(){
            victim_arr.push($(this).attr('data-victim-id'));
        });
        let agressor_arr = [];
        $('input[name="record-agressor"]').each(function(){
            agressor_arr.push($(this).attr('data-agressor-id'));
        });

        let recordId = Number($('.record-card-modal').attr('data-record-id'));
        let registryNumber = Number($('#record-registryNumber').val());
        let registrationDate = new Date($("#record-register-date").val());
        let initiatorAuthority = $("#record-init-org").val();
        let executorAuthority = $("#record-execute-org").val();
        let incidentTypeId = Number($('#record-event-type').val());
        let qualificationId = Number($('#record-qualification').val());;
        let address = $("#record-event-place").val();
        let reason = $("#record-event-reason").val();
        let description = $("#record-describe").val();
        let takenActions = $("#record-measures").val();
        let incidentPersons = {};

        incidentPersons = {
            "1": agressor_arr,
            "2": victim_arr
        }


        const data = {
            "registryNumber": registryNumber,
            "registrationDate": registrationDate.toISOString(),
            "initiatorAuthority": initiatorAuthority,
            "executorAuthority": executorAuthority,
            "incidentTypeId": incidentTypeId,
            "qualificationId": qualificationId,
            "address": address,
            "reason": reason,
            "description": description,
            "takenActions": takenActions,
            "incidentPersons": incidentPersons     
        }; 

        if(userToken && recordId){
            let editIncidentRequest = $.ajax({
                type: "PUT",
                url: `${API_URL}incidents/${recordId}`,
                crossDomain: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
                data: JSON.stringify(data),
                success: function(data){
                    // console.log(data);
                    $('#record-registryNumber').val('');
                    $("#record-register-date").val('');
                    $("#record-init-org").val('');
                    $("#record-execute-org").val('');
                    $("#record-event-place").val('');
                    $("#record-event-reason").val('');
                    $("#record-describe").val('');
                    $("#record-measures").val('');

                    $('.record-card-modal').attr('data-record-id', '');
                    notifications.succsessNotif('Інформацію про подію успішно оновлено');
                    $('.record-card-modal').removeClass('show-modal');
                },
                error: function (data) {
                    notifications.errorNotif();
                    console.log(data);
                }
            });
        }
        // console.log(data);

    });
}
export default editRecordModal;

        