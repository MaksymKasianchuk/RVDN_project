import notifications from '../notifications';

function riskMan() {
    $('.add-risk-management-btn').on('click', function(e){
        e.preventDefault();
        const strTpl = `
        <div class="row factor">
            <div class="col-12 col-md-6">
                <div class="form-group">
                    <label class="form-label">Назва фактору Fi</label>
                    <input type="text" name="" class="fac-name" value="">
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="form-group">
                    <label class="form-label">Значення фактору Fi</label>
                    <input type="text" name="" class="fac-val" value="">
                </div>
            </div>
        </div>
        `;
        $('.risk-man-table').append(strTpl);
    });

    $('.risk-management-btn').on('click', function(e){
        e.preventDefault();
        $('.fac-name').each(function(){
            let val = $(this).val();
            if(!val) {
                notifications.emptyNotif("Не заповено поле назва фактору!");
            }
        });

        let facValues = [];
        $('.fac-val').each(function(){
            let val = Number($(this).val());
            if(!val) {
                notifications.emptyNotif("Не заповено поле значення фактору!");
            }
            facValues.push(val);
        })

        let numberOfValues = facValues.length;

        let lastFactor = facValues[facValues.length-1];

        let bFactVal = [];
        for(let i = 1; i<= numberOfValues; i++){
            let curBFactVal = 0.8 - 0.2 * (i - 1);
            bFactVal.push(Number(curBFactVal.toFixed(2)));
        }

        let pi = 1/numberOfValues;

        let BRiskLevel = 0;
        for(let i = 0; i < bFactVal.length; i++){
            BRiskLevel += bFactVal[i] * pi;
        }
        

        let finishBRisk = 0;
        if(lastFactor<=0.2){
            finishBRisk = Number((BRiskLevel - lastFactor).toFixed(2));
        } else{
            finishBRisk = Number((BRiskLevel + lastFactor).toFixed(2));
        }

        let finishBRiskText;

        if(finishBRisk > 0 && finishBRisk <= 0.2){
            finishBRiskText = 'незначний ризик загрози';
        }
        if(finishBRisk > 0.2 && finishBRisk <= 0.4){
            finishBRiskText = 'низький ризик загрози';
        }
        if(finishBRisk > 0.4 && finishBRisk <= 0.6){
            finishBRiskText = 'середній ризик загрози';
        }
        if(finishBRisk > 0.6 && finishBRisk <= 0.8){
            finishBRiskText = 'високий ризик загрози';
        }
        if(finishBRisk > 0.8 && finishBRisk <= 1){
            finishBRiskText = 'граничний ризик загрози';
        }

        $('.finish-fact-val').val(finishBRisk);
        $('.finish-fact-text').val(finishBRiskText);
        notifications.succsessNotif('Оцінювання успішно проведено');

        $('.risk-management-modal').addClass('show-modal');
    });
    $(".risk-management-modal-btn").on('click', function(e){
        e.preventDefault();
        $('.finish-fact-val').val('');
        $('.finish-fact-text').val('');
        $('.risk-management-modal').removeClass('show-modal');
    });
}
export default riskMan;