import editPersonModal from "../global-functions/edit-person-modal";

function modals(){
    $('.modal-close').on('click', function(e){
		e.preventDefault();
		$(this).parents('.backdrop').removeClass('show-modal');
	});
	$('.modal-wrap').on('click', function(e){
		if(e.target === e.currentTarget){
			$(this).parent().removeClass('show-modal');
		}
	});

	editPersonModal();

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