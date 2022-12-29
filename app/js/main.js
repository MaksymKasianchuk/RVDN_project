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
import getIcidentsTypes from './global-functions/getIcidentsTypes';
import getIncidentsQualifications from './global-functions/getIncidentsQualifications';
import getPersonsSocialSecurityTypes from './global-functions/getPersonsSocialSecurityTypes';
import getPersonsDocTypes from './global-functions/getPersonsDocTypes';
import getPersonsRelShipTypes from './global-functions/getPersonsRelShipTypes';
import viewRiskModal from './global-functions/view-risk-modal';
import switchVisiblePassword from "./global-functions/passwordVisibility";

document.addEventListener('DOMContentLoaded', () => {
	// redirect to login page
	const userToken = sessionStorage.getItem('token');
	if(userToken){
		//parse inctypes in record forms
		let incTypes = getIcidentsTypes();
		incTypes.done(function(data){
			const incSelector1 = $('#record-event-type');
			const incSelector2 = $('#newrecord-event-type');
			if(Array.isArray(data)){
				data.map(item => {
					incSelector1.append(`<option value="${item.id}">${item.name}</option>`);
					incSelector2.append(`<option value="${item.id}">${item.name}</option>`);
				});
			}
		});

		//parse qualifications in record forms
		let incQual = getIncidentsQualifications();
		incQual.done(function(data){
			const incQualSelector1 = $('#record-qualification');
			const incQualSelector2 = $('#newrecord-qualification');
			if(Array.isArray(data)){
				data.map(item => {
					incQualSelector1.append(`<option value="${item.id}">${item.name}</option>`);
					incQualSelector2.append(`<option value="${item.id}">${item.name}</option>`);
				});
			}
		});

		//parse social security in persons forms
		let personSocialSecTypes = getPersonsSocialSecurityTypes();
		personSocialSecTypes.done(function(data){
			const personSocialSecSelector1 = $('#person-money');
			const personSocialSecSelector2 = $('#newperson-money');
			if(Array.isArray(data)){
				data.map(item => {
					personSocialSecSelector1.append(`<option value="${item.id}">${item.name}</option>`);
					personSocialSecSelector2.append(`<option value="${item.id}">${item.name}</option>`);
				});
			}
		});

		//parse documents types in persons forms
		let personsDocTypes = getPersonsDocTypes();
		personsDocTypes.done(function(data){
			const personsDocTypesWrapSelector1 = $('#person-pasport-wrapper');
			const personsDocTypesWrapSelector2 = $('#newperson-pasport-wrapper');
			if(Array.isArray(data)){
				data.map(item => {
					personsDocTypesWrapSelector1.append(`<label><input type="radio" value="${item.id}" name="person-pasport-type" checked> ${item.name}</label>`);
					personsDocTypesWrapSelector2.append(`<label><input type="radio" value="${item.id}" name="newperson-pasport-type" checked> ${item.name}</label>`);
				});
			}
		});

		//parse persons relation ship types risk forms
		let personsRelShipTypes = getPersonsRelShipTypes();
		personsRelShipTypes.done(function(data){
			const personsRelShipTypesWrapSelector1 = $('#newperson-relationship-level');
			const personsRelShipTypesWrapSelector2 = $('#newrisk-relationship-level');
			if(Array.isArray(data)){
				data.map(item => {
					personsRelShipTypesWrapSelector1.append(`<option value="${item.id}">${item.name}</option>`);
					personsRelShipTypesWrapSelector2.append(`<option value="${item.id}">${item.name}</option>`);
				});
			}
		});
	}
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
	if(userToken){
		$('.new-record-btn').show();
	} else {
		$('.new-record-btn').hide();
	}
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

	viewRiskModal();

	switchVisiblePassword('#login-password-btn', 'is-visible', '#login-user-password');
	switchVisiblePassword('#register-password-btn', 'is-visible', '#register-password');
	switchVisiblePassword('#register-password-confirm-btn', 'is-visible', '#register-password-confirm');

});