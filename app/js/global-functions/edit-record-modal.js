import { data } from "jquery";
import API_URL from "../api";

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
        let incidentTypeId ;
        let qualificationId ;
        let address = $("#record-event-place").val();
        let reason = $("#record-event-reason").val();
        let description = $("#record-describe").val();
        let takenActions = $("#record-measures").val();
        let incidentPersons = {};

        incidentPersons = {
            "1": agressor_arr,
            "2": victim_arr
        }

        if($('#record-event-type').val() === "Фізичне насилля"){
            incidentTypeId = 1;
        } else if($('#record-event-type').val() === "Психологічне насилля"){
            incidentTypeId = 2;
        }

        if($("#record-qualification").val() === "Serious-injuries"){
            qualificationId = 1;
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
                    console.log(data);
                    // $('#newrecord-registryNumber').val('');
                    // $("#newrecord-register-date").val('');
                    // $("#newrecord-init-org").val('');
                    // $("#newrecord-execute-org").val('');
                    // $('#newrecord-event-type').val('');
                    // $("#newrecord-qualification").val('');
                    // $("#newrecord-event-place").val('');
                    // $("#newrecord-event-reason").val('');
                    // $("#newrecord-describe").val('');
                    // $("#newrecord-measures").val('');
                },
                error: function (data) {
                   console.log(data);
                }
            });
        }
        console.log(data);

    });
}
export default editRecordModal;

        