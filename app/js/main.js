import $ from 'jquery'
window.jQuery = $
window.$ = $

document.addEventListener('DOMContentLoaded', () => {
	const settingsSelectors= {
		btn:'.settings-btn', 
		menu: '.settings-menu', 
		open: 'show'
	}
	const mobileSelectors= {
		btn:'.burger-btn', 
		menu: '.mobile-menu', 
		open: 'show'
	}
	const newRecordSelectors= {
		btn:'.new-record-btn', 
		menu: '.new-record-menu', 
		open: 'show'
	}

	$('.settings-btn').on('click', function(){
		$(this).siblings('.settings-menu').toggleClass('show');
	});
	$('.burger-btn').on('click', function(){
		$('.mobile-menu').toggleClass('show');
	});
	$('.new-record-btn').on('click', function(){
		$('.new-record-menu').toggleClass('show');
	});


	$(document).mouseup(function (e){
        missClickHandler(settingsSelectors, e);
		missClickHandler(mobileSelectors, e);
		missClickHandler(newRecordSelectors, e);
    });

	//------------------MODAL--------------------------
	$('.modal-close').on('click', function(e){
		$(this).parents('.modal-wrap').removeClass('show-modal');
	});
	$('.modal-wrap').on('click', function(e){
		if(e.target === e.currentTarget){
			$(this).removeClass('show-modal');
		}
	});

	$('.view-person-btn').on('click', function(e){
		$('.person-card-modal').addClass('show-modal');
	});
	$('.record-info-btn').on('click', function(e){
		$('.record-card-modal').addClass('show-modal');
	});
});

function missClickHandler(refs, event){
    const { btn, menu, open} =  refs;
    const div = $(btn); 
    if (!div.is(event.target)
    && $(menu).has(event.target).length === 0) {
        $(menu).removeClass(open);
        // div.removeClass(open);
    }
}