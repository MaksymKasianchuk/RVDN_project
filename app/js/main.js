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

	$('.settings-btn').on('click', function(){
		$(this).siblings('.settings-menu').toggleClass('show');
	});

	$('.burger-btn').on('click', function(){
		$('.mobile-menu').toggleClass('show');
	});

	$(document).mouseup(function (e){
        missClickHandler(settingsSelectors, e);
		missClickHandler(mobileSelectors, e);
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