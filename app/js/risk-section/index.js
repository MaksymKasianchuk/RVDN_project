function riskSection() {
    $('.open-risk-section-btn').on('click', function(e){
		$('.add-risk-section').toggleClass('show-section');
	});

	let counter1 = 0, counter2 = 0;

	let arr1 = [1,2,3,4,5,6];
	let arr2 = [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27];
	const inp1ArrSelectors = [];
	const inp2ArrSelectors = [];
	arr1.map(elem => {
		inp1ArrSelectors.push(`input[name=newrisk-q${elem}]`);
	});
	arr2.map(elem => {
		inp2ArrSelectors.push(`input[name=newrisk-q${elem}]`);
	});
	
	inp1ArrSelectors.map(inpElem => {
		$(inpElem).on('change', function(){
			if($(this).is(':checked') && $(this).val() === 'Так'){
				$(this).attr('data-ch1', true);
			} 
			else if($(this).is(':checked') && $(this).val() !== 'Так'){
				$(this).parent().siblings('label').find('input[data-ch1]').attr('data-ch1', false);
			}
		});
	});
	inp2ArrSelectors.map(inpElem => {
		$(inpElem).on('change', function(){
			if($(this).is(':checked') && $(this).val() === 'Так'){
				$(this).attr('data-ch2', true);
			} 
			else if($(this).is(':checked') && $(this).val() !== 'Так'){
				$(this).parent().siblings('label').find('input[data-ch2]').attr('data-ch2', false);
			}
		});
	});

	$('input[type="radio"]').on('change',function(){
		counter1 = $('input[data-ch1="true"]').length;
		counter2 = $('input[data-ch2="true"]').length;
		if(counter1 >= 2){
			$("#newrisk-risk-level-high").prop("checked", true);
			$("#newrisk-risk-level-middle").prop("checked", false);
			$("#newrisk-risk-level-low").prop("checked", false);
		}

		if(counter1 === 1 && counter2 >= 7){
			$("#newrisk-risk-level-middle").prop("checked", true);
			$("#newrisk-risk-level-high").prop("checked", false);
			$("#newrisk-risk-level-low").prop("checked", false);
		}

		if(counter1 === 0 && counter2 >= 14){
			$("#newrisk-risk-level-middle").prop("checked", true);
			$("#newrisk-risk-level-high").prop("checked", false);
			$("#newrisk-risk-level-low").prop("checked", false);
		}

		if(counter1 === 1 && counter2 <= 6 && counter2 !== 0){
			$("#newrisk-risk-level-low").prop("checked", true);
			$("#newrisk-risk-level-high").prop("checked", false);
			$("#newrisk-risk-level-middle").prop("checked", false);
		}

		if(counter1 === 0 && counter2 <= 13 && counter2 !== 0){
			$("#newrisk-risk-level-low").prop("checked", true);
			$("#newrisk-risk-level-high").prop("checked", false);
			$("#newrisk-risk-level-middle").prop("checked", false);
		}

		if(counter1 === 0 && counter2 === 0){
			$("#newrisk-risk-level-high").prop("checked", false);
			$("#newrisk-risk-level-middle").prop("checked", false);
			$("#newrisk-risk-level-low").prop("checked", false);
		}


		if($("#newrisk-risk-level-high").prop("checked")){
			$("#newrisk-risk-level-high-label").css("color", "red");
		} else {
			$("#newrisk-risk-level-high-label").css("color", "#747272");
		}

		if($("#newrisk-risk-level-middle").prop("checked")){
			$("#newrisk-risk-level-middle-label").css("color", "orange");
		} else {
			$("#newrisk-risk-level-middle-label").css("color", "#747272");
		}

		if($("#newrisk-risk-level-low").prop("checked")){
			$("#newrisk-risk-level-low-label").css("color", "#e1ca00");
		} else {
			$("#newrisk-risk-level-low-label").css("color", "#747272");
		}
	});

}
export default riskSection;