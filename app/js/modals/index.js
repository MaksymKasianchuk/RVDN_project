function modals(){
    $('.modal-close').on('click', function(e){
		e.preventDefault();
		$(this).parents('.backdrop').removeClass('show-modal');
		$('#person-role').removeAttr('disabled');
		// $('#person-children-yes').removeAttr('disabled');
		// $('#person-children-no').removeAttr('disabled');
		$('#person-name').removeAttr('readonly');
		// $('#person-pasport-type-pasport').removeAttr('disabled');
		// $('#person-pasport-type-card').removeAttr('disabled');
		// $('#person-pasport-type-drive').removeAttr('disabled');
		$('#person-pasport-ser').removeAttr('readonly');
		$('#person-pasport-number').removeAttr('readonly');
		$('#person-pasport-date').removeAttr('readonly');
		$('#person-money').removeAttr('disabled');
		$('#person-relationship').removeAttr('readonly');
		$('#person-birthday').removeAttr('readonly');
		$('#person-phone').removeAttr('readonly');
		$('#person-reg-address').removeAttr('readonly');
		$('#person-home-address').removeAttr('readonly');
		$('#person-work').removeAttr('readonly');
		$('#person-relationship-level').removeAttr('disabled');
	});
	$('.modal-wrap').on('click', function(e){
		if(e.target === e.currentTarget){
			$(this).parent().removeClass('show-modal');
		}
	});

	// $('.view-person-btn').on('click', function(e){
	// 	$('.person-card-modal').addClass('show-modal');
	// });
	$('.edit-record-btn').on('click', function(e){
		$('.record-card-modal').addClass('show-modal');
	});

	//--------------------RECORD-MODAL-FILES--------------------
	// let fileInput = document.getElementById('record-file');
	// const reader = new FileReader();
	// fileInput.addEventListener('change', (event) => {
	// 	let filesArr = fileInput.files;
	// 	let markup = '';
	// 	Array.from(filesArr).forEach(file => { 
			
	// 		let fileName = `<p>${file.name}</p>`;
	// 		markup = markup + fileName;
	// 	});
	// 	$('.modal-add-files-btn').siblings('div').append(markup);

	// });

    
}
export default modals;