import { data } from "jquery";
import API_URL from "../api";
import notifications from "../notifications";
import getIcidentsTypes from './getIcidentsTypes';
import getIncidentsQualifications from './getIncidentsQualifications';

function getRecordInfo(){
    $('.edit-record-btn').each(function(){
        if($(this).attr('data-listener') === 'true'){
            return ;
        } else{
            viewRecordListener(this);
            $(this).attr('data-listener', 'true');
        }
    });
    function viewRecordListener(btnSelector){
        $(btnSelector).on('click', function(){
           
            const userToken = sessionStorage.getItem('token');
            let recordId = $(this).attr('data-record-id');
            if(userToken && recordId){
                let getRecordInfoRequest = $.ajax({
                    type: "GET",
                    url: `${API_URL}incidents/${recordId}`,
                    crossDomain: true,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
                    },
                    success: function(data){
                        // console.log(data);
                        let {
                            incidentType,
                            qualification,
                            address,
                            reason,
                            description,
                            takenActions,
                            id,
                            registryNumber,
                            registrationDate,
                            receiptDate,
                            executionDate,
                            initiatorAuthority,
                            executorAuthority,
                            status,
                            incidentPersons
                        }  = {...data}
                        let regDate = registrationDate ? new Date(registrationDate) : new Date();
                        let regDateday = ("0" + regDate.getDate()).slice(-2);
                        let regDatemonth = ("0" + (regDate.getMonth() + 1)).slice(-2);
                        let regDateStr = regDate.getFullYear()+"-"+(regDatemonth)+"-"+(regDateday);

                        let incTypes = getIcidentsTypes();
                        incTypes.done(function(data){
                            if(Array.isArray(data)){
                                data.map(item => {
                                    if(incidentType === item.name){
                                        $('#record-event-type').val(item.id);
                                    }
                                });
                            }
                        });
                      
                        let incQual = getIncidentsQualifications();
                        incQual.done(function(data){
                            if(Array.isArray(data)){
                                data.map(item => {
                                    if(qualification === item.name){
                                        $('#record-qualification').val(item.id);
                                    }
                                });
                            }
                        });

                        $('#record-registryNumber').val(registryNumber);
                        $('#record-register-date').val(regDateStr);
                        $('#record-init-org').val(initiatorAuthority);
                        $('#record-execute-org').val(executorAuthority);
                        $('#record-event-place').val(address);
                        $('#record-event-reason').val(reason);
                        $('#record-describe').val(description);
                        $('#record-measures').val(takenActions);

                        let agressorsMarkup = '';
                        incidentPersons.Кривдник.map(agressor=>{
                            agressorsMarkup +=`
                            <div class="form-group">
                                <label class="form-label">Особа кривдник</label>
                                <input type="text" name="record-agressor" data-agressor-id="${agressor.id}" readonly value="${agressor.fullName}">
                            </div>`;
                        });
                        $('#record-agressor').html(agressorsMarkup);

                        let victimsMarkup = '';
                        incidentPersons.Постраждалий.map(victim=>{
                            victimsMarkup +=`
                            <div class="form-group">
                                <label class="form-label">Постраждала особа</label>
                                <input type="text" name="record-victim" data-victim-id="${victim.id}" readonly value="${victim.fullName}">
                            </div>`;
                        });
                        $('#record-victim').html(victimsMarkup);

                        $('.record-card-modal').attr('data-record-id', id);
                        $('.record-card-modal').addClass('show-modal');
                    },
                    error: function (data) {
                        notifications.errorNotif();
                        // console.log(data);
                    }
                });
            }
        });
    }

}
export default getRecordInfo;