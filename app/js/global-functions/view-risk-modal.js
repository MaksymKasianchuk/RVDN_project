import { data } from "jquery";
import API_URL from "../api";
import notifications from "../notifications";

function viewRiskModal(){
   $('.record-card-modal-open-risk').on('click', function(e){
      e.preventDefault();

      let recID = $(".record-card-modal").attr("data-record-id");
      const userToken = sessionStorage.getItem('token');
      if(userToken){
         let getriskInfoRequest = $.ajax({
            type: "GET",
            url: `${API_URL}incidents/${recID}/risk_assessment`,
            crossDomain: true,
            headers: {
               'Access-Control-Allow-Origin': '*',
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${userToken}`,
            },
            success: function(data){
               console.log(data);
               let {
                  address,
                  dangerLevelName,
                  date,
                  didDialogHappen,
                  didVictimPhoneHotline,
                  id,
                  isInjunctionIssued,
                  number,
                  policeComments,
                  questionAnswersInfo,
                  relationshipTypeName,
                  victimDisturber,
                  wasDialogRejected
               } = {...data}
               let riskDate = date ? new Date(date) : new Date();
               let riskDateday = ("0" + riskDate.getDate()).slice(-2);
               let riskDatemonth = ("0" + (riskDate.getMonth() + 1)).slice(-2);
               let riskDateStr = (riskDateday)+"."+(riskDatemonth)+"."+(riskDate.getFullYear());

               $('#risk-relationship-level').val(relationshipTypeName); 
               $('#risk-event-place').val(address);
               $('#risk-q28').val(victimDisturber);
               $('#risk-q29').val(didVictimPhoneHotline);
               $('#risk-police-comment').val(policeComments);
               $('#risk-termin-num').val(number);
               $('#risk-termin-date').val(riskDateStr);
               $('#risk-risk-level').val(dangerLevelName);
               didDialogHappen ? $('#risk-dialog').val("Так") : $('#risk-dialog').val("Ні");
               wasDialogRejected ? $('#risk-dialog-reject').val("Так") : $('#risk-dialog-reject').val("Ні");
               isInjunctionIssued ? $('#risk-termin').val("Так") : $('#risk-termin').val("Ні");
               
               let questMarkup = '';
               if(Array.isArray(questionAnswersInfo)){
                  questionAnswersInfo.map(question => {
                     let answer = question.answer ? "Так" : "Ні";
                     
                     questMarkup += `<div class="row mt-2">
                        <div class="col-12 col-md-6">
                           <label class="form-label">${question.questionWording}</label>
                        </div>
                        <div class="col-12 col-md-6">
                           <input name="risk-q${question.id}" id="risk-q${question.id}" type="text" readonly val="${answer}"> 
                        </div>
                     </div>`;
                  });
               }
               $('.risk-questions').html(questMarkup);

               $('.risk-modal').addClass('show-modal');
            },
            error: function(data){
               console.log(data);
               notifications.errorNotif();
            }
         });
      }
   });



   //close modal
   $('.risk-modal-btn').on('click', function(e){
      e.preventDefault();
      $('.risk-modal').removeClass('show-modal');

      $('#risk-relationship-level').val('');
      $('#risk-event-place').val('');
      $('#risk-q28').val('');
      $('#risk-q29').val('');
      $('#risk-police-comment').val('');
      $('#risk-termin-num').val('');
      $('#risk-termin-date').val('');
      $('#risk-risk-level').val('');
      $('#risk-dialog').val('');
      $('#risk-dialog-reject').val('');
      $('#risk-termin').val('');
      $('.risk-questions').html('');
   });
}
export default viewRiskModal;