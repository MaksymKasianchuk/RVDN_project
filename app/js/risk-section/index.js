function riskSection() {
    $('.open-risk-section-btn').on('click', function(e){
		$('.add-risk-section').toggleClass('show-section');
	});

	// let counter1 = 0, counter2 = 0;

	// let arr1 = [1,2,3,4,5,6];
	// let arr2 = [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27];
	// const inp1ArrSelectors = [];
	// const inp2ArrSelectors = [];
	// arr1.map(elem => {
	// 	inp1ArrSelectors.push(`input[name=newrisk-q${elem}]`);
	// });
	// arr2.map(elem => {
	// 	inp2ArrSelectors.push(`input[name=newrisk-q${elem}-yes]`);
	// });
	// console.log(inp1Arr);
	// console.log(inp2Arr);
	
	// inp1ArrSelectors.map(inpElem => {
	// 	$(inpElem).on('change', function(){
	// 		if($(this).is(':checked') && $(this).val() === 'Так'){
	// 			counter1++;
	// 			$(this).attr('data-ch', true);
	// 			console.log(counter1);
	// 		} 
	// 		// else if($(this).is(':checked') && $(this).val() !== 'Так' && $(this).parent().siblings('label').find('input[data-ch]').attr('data-ch') === true){
	// 		// 	counter1--;
	// 		// 	$(this).parent().siblings('label').find('input[data-ch]').attr('data-ch', false);
	// 		// 	console.log(counter1);
	// 		// }
	// 	});
	// });
}
export default riskSection;