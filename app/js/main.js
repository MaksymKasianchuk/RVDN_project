import $ from 'jquery'
window.jQuery = $
window.$ = $

document.addEventListener('DOMContentLoaded', () => {
	// redirect to login page

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
		// e.preventDefault();
		$(this).parents('.backdrop').removeClass('show-modal');
	});
	$('.modal-wrap').on('click', function(e){
		console.log(e.target === e.currentTarget);
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


	//---------ADD-NEW-PERSON---------------
	//-----------add-relative-btn-in-fom
	$('.add-relative-btn').on('click', function(e){
		const strTpl = `
			<div class="col-12 col-md-6 col-lg-4">
				<div class="form-group">
					<label class="form-label">ПІБ</label>
					<input type="text" name="newperson-relationship" id="" value="">
				</div>
				<div class="form-group newperson-relationship-level">
					<label class="form-label">Рівень зв'язку</label>
					<select name="newperson-relationship-level" id="">
						<option value="Чоловік">Чоловік</option>
						<option value="Дружина">Дружина</option>
						<option value="Брат">Брат</option>
						<option value="Сестра">Сестра</option>
						<option value="Інше..." selected>Інше...</option>
					</select>
				</div>
			</div>
		`;
		$(this).parents('.add-relateve-col').before(strTpl);
	});

	//---------ADD-NEW-RECORD---------------
	//add one more victim to form
	$('.add-victim-btn').on('click', function(e){
		const strTpl = `
		<div class="form-group top-line-form-group">
			<label class="form-label">Постраждала особа</label>
			<input type="text" name="newrecord-victim" id="" value="">
		</div>
		`;
		$(this).before(strTpl);
	});
	//add one more agressor to form
	$('.add-agressor-btn').on('click', function(e){
		const strTpl = `
		<div class="form-group">
			<label class="form-label">Особа кривдник</label>
			<input type="text" name="newrecord-agressor" id="" value="">
		</div>
		`;
		$(this).before(strTpl);
	});

	//---------------------RISK-SECTION--------------------
	$('.open-risk-section-btn').on('click', function(e){
		$('.add-risk-section').toggleClass('show-section');
	});


	//-------------------------------LOGIN-------------------------------------------
	$('#login-btn').on('click', function(e){
		e.preventDefault();
		window.location.replace('main.html');
	});


	//-------------------------------PASSWORD-RENEW-------------------------------------------
	//send reqest and show step two
	$('#password-renew-btn-step-one').on('click', function(e){
		e.preventDefault();
		$('.password-renew-step-one').hide();
		$('.password-renew-step-two').show();
	});
	//send reqest and show step three
	$('#password-renew-btn-step-two').on('click', function(e){
		e.preventDefault();
		$('.password-renew-step-two').hide();
		$('.password-renew-step-three').show();
	});

	//close step two and show step one
	$('.password-renew-btn.prevstep1').on('click', function(e){
		$('.password-renew-step-two').hide();
		$('.password-renew-step-one').show();
	});
	//close step three and show step two
	$('.password-renew-btn.prevstep2').on('click', function(e){
		$('.password-renew-step-three').hide();
		$('.password-renew-step-two').show();
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