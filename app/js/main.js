//----------components-------------
import $ from 'jquery';
window.jQuery = $
window.$ = $
import missClickHandler from './missclick';
//--------Pages---------
import header from './header';
import login from './login';
import register from './register';
import passwordRenew from './password-renew';
import profile from './perofile';
import addNewRecord from './add-new-record';
import addNewPerson from './add-new-person';
import modals from './modals';
import riskSection from './risk-section';
import myInfo from './my-info-section';
import allInfo from './all-info-section';
import search from './search';

document.addEventListener('DOMContentLoaded', () => {
	// redirect to login page
	
	const settingsSelectors = {
		btn:'.settings-btn', 
		menu: '.settings-menu', 
		open: 'show'
	}
	const mobileSelectors = {
		btn:'.burger-btn', 
		menu: '.mobile-menu', 
		open: 'show'
	}
	const newRecordSelectors = {
		btn:'.new-record-btn', 
		menu: '.new-record-menu', 
		open: 'show'
	}
	const searchSelectors = {
		btn:'.search-btn', 
		menu: '.search-modal-wrap', 
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
		missClickHandler(searchSelectors, e);
    });

	//-----------HEADER------------------
	header();

	//---------ADD-NEW-PERSON---------------
	addNewPerson();

	//---------ADD-NEW-RECORD---------------
	addNewRecord();

	//---------------------RISK-SECTION--------------------
	riskSection();

	//-------------------------------LOGIN-------------------------------------------
	login();
	register();

	//-------------------------------PASSWORD-RENEW-------------------------------------------
	passwordRenew();
	
	//--------------------MY-INFO-------------
	allInfo();

	//--------------------MY-INFO-------------
	myInfo();

	//------------------MODAL--------------------------
	modals();
	
	//---------------------SEARCH------------------------
	search();

	//---------------------PROFILE------------------------
	profile();
	
});