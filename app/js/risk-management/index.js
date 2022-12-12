function riskMan() {
    // let factorsArr = [];
    // $('#risk-factor').each(function (){
    //     factorsArr.push($(this).val());
    // });

    // let numberOfValues = factorsArr.length;

    // let maxEntVal = 1/ numberOfValues;

    // const MFactorArr = [0.2, 0.16, 0.84, 1];
    // let lambdaFactVal = [];
    // for(let i = 0; i < numberOfValues; i++){
    //     if(factorsArr[i] < MFactorArr[1]) {lambdaFactVal.push(1);} else lambdaFactVal.push(0);
    // }

    // let bFactVal = [];
    // for(num in numberOfValues){
    //     let curBFactVal = 0.9 - 0.2 * (num - 1);
    //     bFactVal.push(curBFactVal);
    // }

    // let sum1;
    // for(let i = 0; i < numberOfValues; i++){
    //     sum1 = maxEntVal * lambdaFactVal[i];
    // }
    // let sum2 = bFactVal.reduce( (curBFactVal, acc) => { acc+= curBFactVal});
   
    // let BRiskLevel = sum1 * sum2

    $('.add-risk-management-btn').on('click', function(e){
        e.preventDefault();
        const strTpl = `
        <div class="col-12 col-md-6">
            <div class="form-group">
                <label class="form-label">Назва фактору Fi</label>
                <input type="text" name="" id="" value="">
            </div>
        </div>
        <div class="col-12 col-md-6">
            <div class="form-group">
                <label class="form-label">Значення фактору Fi</label>
                <input type="text" name="" id="" value="">
            </div>
        </div>
        `;
        $('.risk-man-table').append(strTpl);
    });

    $('.risk-management-btn').on('click', function(e){
        e.preventDefault();
        $('.risk-management-modal').addClass('show-modal');
    });
    $(".risk-management-modal-btn").on('click', function(e){
        e.preventDefault();
        $('.risk-management-modal').removeClass('show-modal');
    });
}
export default riskMan;