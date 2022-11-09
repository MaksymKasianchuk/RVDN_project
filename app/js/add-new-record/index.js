import API_URL from "../api";

function addNewRecord(){
    //add one more victim to form
    $('.add-victim-btn').on('click', function(e){
        const strTpl = `
        <div class="form-group top-line-form-group">
            <label class="form-label">Постраждала особа</label>
            <input type="text" name="newrecord-victim" id="" value="">
        </div>
        `;
        $(this).before(strTpl);
        icidentPersonsListener();
    });
    //add one more agressor to form
    $('.add-agressor-btn').on('click', function(e){
        const strTpl = `
        <div class="form-group">
            <label class="form-label">Особа кривдник</label>
            <input type="text" name="newrecord-agressor" id="" value="">
        </div>
        `;
        $(this).before(strTpl);
        icidentPersonsListener();
    });

    let victim_arr = [];
    let agressor_arr = [];

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
            console.log(data);
            }
        });
        icidentPersonsListener(getAllPersonsRequest);
    }
   
    function icidentPersonsListener(getAllPersonsRequest){
        getAllPersonsRequest.done(function(){
            $('input[name="newrecord-victim"]').each(function(){
                $(this).on('input', function(){
                    if($(this).val().length > 3){
                        personsArr.map(elem=>{
                            let name = elem.fullName;
                            if (name.includes($(this).val())){
                                $('.persons').html(`<p>${name}</p>`);
                            }
                            if($(this).val() === name && victim_arr.indexOf(elem.id) === -1){
                                victim_arr.push(elem.id);
                                console.log(victim_arr);
                            }
                        });
                    }
                });
            });
            $('input[name="newrecord-agressor"]').each(function(){
                $(this).on('input', function(){
                    if($(this).val().length > 3){
                        personsArr.map(elem=>{
                            let name = elem.fullName;
                            if (name.includes($(this).val())){
                                $('.persons').html(`<p>${name}</p>`);
                            }
                            if($(this).val() === name && agressor_arr.indexOf(elem.id) === -1){
                                agressor_arr.push(elem.id);
                                console.log(agressor_arr);
                            }
                        });
                    }
                });
            });
        });
    };


    //------------------------CREATION OF  NEW RECORD
    $('#add-new-record-btn').on('click', function(e){
        e.preventDefault();
        let registryNumber = Number($('#newrecord-registryNumber').val());
        let registrationDate = new Date($("#newrecord-register-date").val());
        let initiatorAuthority = $("#newrecord-init-org").val();
        let executorAuthority = $("#newrecord-execute-org").val();
        let incidentTypeId = Number($('#newrecord-event-type').val());
        let qualificationId = Number($("#newrecord-qualification").val());
        let address = $("#newrecord-event-place").val();
        let reason = $("#newrecord-event-reason").val();
        let description = $("#newrecord-describe").val();
        let takenActions = $("#newrecord-measures").val();
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
        // console.log(data);
        if(userToken){
            let createIncidentRequest = $.ajax({
                type: "POST",
                url: `${API_URL}incidents`,
                crossDomain: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
                data: JSON.stringify(data),
                success: function(data){
                    console.log(data);
                    $('#newrecord-registryNumber').val('');
                    $("#newrecord-register-date").val('');
                    $("#newrecord-init-org").val('');
                    $("#newrecord-execute-org").val('');
                    $('#newrecord-event-type').val('');
                    $("#newrecord-qualification").val('');
                    $("#newrecord-event-place").val('');
                    $("#newrecord-event-reason").val('');
                    $("#newrecord-describe").val('');
                    $("#newrecord-measures").val('');
                },
                error: function (data) {
                   console.log(data);
                }
            });
        }

    });

}
export default addNewRecord;