function modals(){
    $('.modal-close').on('click', function(e){
		// e.preventDefault();
		$(this).parents('.backdrop').removeClass('show-modal');
	});
	$('.modal-wrap').on('click', function(e){
		if(e.target === e.currentTarget){
			$(this).parent().removeClass('show-modal');
		}
	});

	$('.view-person-btn').on('click', function(e){
		$('.person-card-modal').addClass('show-modal');
	});
	$('.record-info-btn').on('click', function(e){
		$('.record-card-modal').addClass('show-modal');
	});
}
export default modals;