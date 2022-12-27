import API_URL from "../api";
import notifications from "../notifications";

function addNewRecord(){
    let userToken = sessionStorage.getItem('token');
    let victim_arr = [];
    let agressor_arr = [];
    const personsArr  = [];
    let qualifications = [];

    if (userToken){
        //add one more victim to form
        $('.add-victim-btn').on('click', function(e){
            const strTpl = `
            <div class="form-group top-line-form-group">
                <label class="form-label">Постраждала особа</label>
                <input type="text" name="newrecord-victim" id="" value="">
            </div>
            `;
            $(this).before(strTpl);
            incidentPersonsListener();
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
            incidentPersonsListener();
        });

      
   
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
                // console.log(data);
            }
        });
        incidentPersonsListener();
    
    
        function incidentPersonsListener(){
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
                                    // console.log(victim_arr);
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
                                    // console.log(agressor_arr);
                                }
                            });
                        }
                    });
                });
            });
        };


        // //get qualifications
        // let qualificationsReq = $.ajax({
        //     type: "GET",
        //     url: `${API_URL}incidents/qualifications`,
        //     crossDomain: true,
        //     headers: {
        //         'Access-Control-Allow-Origin': '*',
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${userToken}`,
        //     },
        //     data: JSON.stringify(data),
        //     success: function(data){

    }


    //------------------------CREATION OF  NEW RECORD
    $('#add-new-record-btn').on('click', function(e){
        e.preventDefault();
        if(!$("#newrecord-register-date").val()){
            notifications.errorNotif('Некоректно введена дата реєстрації!');
            return;
        }
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

        if(!registryNumber || !registrationDate || !initiatorAuthority || !executorAuthority || !incidentTypeId || !qualificationId || !address || !reason || !description || !incidentPersons){
            notifications.errorNotif('Не заповнені всі поля форми!');
            return;
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
            let recID;
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
                    recID = data.id;
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
                    notifications.succsessNotif("Запис про подію успішно створено");
                },
                error: function (data) {
                    notifications.emptyNotif(data.responseJSON)
                    //console.log(data);
                }
            });
        }
    });

    $(".add-new-risk-btn").on("click", function(e){
        e.preventDefault();
        if(!$("#newrecord-register-date").val()){
            notifications.errorNotif('Некоректно введена дата реєстрації!');
            return;
        }
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

        if(!registryNumber || !registrationDate || !initiatorAuthority || !executorAuthority || !incidentTypeId || !qualificationId || !address || !reason || !description || !incidentPersons){
            notifications.errorNotif('Не заповнені всі поля форми!');
            return;
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
            let recID;
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
                    recID = data.id;
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
                    notifications.succsessNotif("Запис про подію та форму ризиків успішно створено");
                },
                error: function (data) {
                    notifications.emptyNotif(data.responseJSON)
                    //console.log(data);
                }
            });

            // ----------------------------------CREATE RECORD--------------------------
			// let relationshipTypeName = $('#newrisk-relationship-level').val();
            let relationshipTypeName = 'Test_Relationship';
			let address = $('#newrisk-event-place').val();
			let didDialogHappen = $('input[name="newrisk-dialog"]').val() === 'Так' ? true : false;
			let wasDialogRejected = $('input[name="newrisk-dialog-reject"]').val() === 'Так' ? true : false;
			let victimDisturber = $('#newrisk-q28').val();
			let didVictimPhoneHotline = $('input[name="newrisk-q29"]').val() === 'Так' ? true : false;
			let policeComments = $('#newrisk-police-comment').val();
			let isInjunctionIssued = $('input[name="newrisk-termin"]').val() === 'Так' ? true : false;
			let number = $('#newrisk-termin-num').val();
			let date = $('#newrisk-termin-date').val() ? new Date($('#newrisk-termin-date').val()) : new Date();
			let dangerLevelName = $('input[name="newrisk-risk-level"]').is(':checked') ? $('input[name="newrisk-risk-level"]:checked').val() : '';
			let questionAnswersInfo = [];
            if(!dangerLevelName){
                notifications.errorNotif('Не призначено рівень небезпеки!');
                return;
            }

			let arrAllQ = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27];
			arrAllQ.map(inpnum => {
				questionAnswersInfo.push(
					{
						"id": inpnum,
						"questionWording": $(`.newrisk-quest${inpnum}`).text(),
						"answer": $(`input[name=newrisk-q${inpnum}]:checked`).val() === 'Так' ? true : false,
					}
				)
			});

			let riskdata = {
				"relationshipTypeName": relationshipTypeName,
				"address": address,
				"didDialogHappen": didDialogHappen,
				"wasDialogRejected": wasDialogRejected,
				"victimDisturber": victimDisturber,
				"didVictimPhoneHotline": didVictimPhoneHotline,
				"policeComments": policeComments,
				"isInjunctionIssued": isInjunctionIssued,
				"number": number,
				"date": date.toISOString(),
				"dangerLevelName": dangerLevelName,
				"questionAnswersInfo": questionAnswersInfo
			}

            console.log(riskdata);

			createIncidentRequest.done(
				function(){
					let newRiskRequest = $.ajax({
						type: "PUT",
						url: `${API_URL}incidents/${recID}/risk_assessment`,
						crossDomain: true,
						headers: {
							'Access-Control-Allow-Origin': '*',
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${userToken}`,
						},
						data: JSON.stringify(riskdata),
						success: function(data){
							// console.log(data);
						
						},
						error: function (data) {
							notifications.errorNotif();
							console.log(data);
						}
					
					});
				}
			);
        }
    });

}
export default addNewRecord;