import { data } from "jquery";
import API_URL from "../api";

function getPersonInfo(readonly = false){
    $('.view-person-btn').on('click', function(e){
        let personId = Number($(this).attr('data-person-id'));
        let personRole = $(this).attr('data-person-role');
        const userToken = sessionStorage.getItem('token');
        // $('#person-role').removeAttr('disabled');
		// // $('#person-children-yes').removeAttr('disabled');
		// // $('#person-children-no').removeAttr('disabled');
		// $('#person-name').removeAttr('readonly');
		// // $('#person-pasport-type-pasport').removeAttr('disabled');
		// // $('#person-pasport-type-card').removeAttr('disabled');
		// // $('#person-pasport-type-drive').removeAttr('disabled');
		// $('#person-pasport-ser').removeAttr('readonly');
		// $('#person-pasport-number').removeAttr('readonly');
		// $('#person-pasport-date').removeAttr('readonly');
		// $('#person-money').removeAttr('disabled');
		// $('#person-relationship').removeAttr('readonly');
		// $('#person-birthday').removeAttr('readonly');
		// $('#person-phone').removeAttr('readonly');
		// $('#person-reg-address').removeAttr('readonly');
		// $('#person-home-address').removeAttr('readonly');
		// $('#person-work').removeAttr('readonly');
		// $('#person-relationship-level').removeAttr('disabled');
        if(personId && personRole && userToken){
            let getPersonInfoRequest = $.ajax({
                type: "GET",
                url: `${API_URL}persons/${personId}`,
                crossDomain: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
                // data: JSON.stringify(data),
                success: function(data){
                    // console.log(data);
                    const {
                        birthDate,
                        fullName,
                        hasChildren,
                        id,
                        livingAddress,
                        personDocumentInfo,
                        phoneNumber,
                        registrationAddress,
                        relationships,
                        socialSecurity,
                        workingPlace,
                    } = { ...data };
                    let bdDate = birthDate ? new Date(birthDate) : 0;
                    // let birthDateStr = bdDate !== 0 ? `${bdDate.getFullYear()}-${bdDate.getMonth()}-${bdDate.getDay()}` : '-';
                    let bdDateday = ("0" + bdDate.getDate()).slice(-2);
                    let bdDatemonth = ("0" + (bdDate.getMonth() + 1)).slice(-2);
                    let birthDateStr = bdDate.getFullYear()+"-"+(bdDatemonth)+"-"+(bdDateday) ;

                    if(personRole === 'victim') { $('#person-role').val('Постраждала особа'); }
                    else if(personRole === 'agressor') { $('#person-role').val('Особа кривдник'); }
                    if(hasChildren) { $('#person-children-yes').attr('checked', 'checked'); } 
                    else { $('#person-children-no').attr('checked', 'checked'); }
    
                    $('#person-name').val(fullName);
                    $('#person-pasport-ser').val(personDocumentInfo);
                    $('#person-money').val(socialSecurity);
                    $('#person-relationship').val(relationships);
                    $('#person-birthday').val(birthDateStr);
                    $('#person-phone').val(phoneNumber);
                    $('#person-reg-address').val(registrationAddress);
                    $('#person-home-address').val(livingAddress);
                    $('#person-work').val(workingPlace);
                    $('#person-card-modal').attr('data-person-id', id);
                    // if(readonly){
                    //     $('#person-role').attr('disabled', 'disabled');
                    //     // $('#person-children-yes').attr('disabled', 'disabled');
                    //     // $('#person-children-no').attr('disabled', 'disabled');
                    //     $('#person-name').attr('readonly', 'readonly');
                    //     // $('#person-pasport-type-pasport').attr('disabled', 'disabled');
                    //     // $('#person-pasport-type-card').attr('disabled', 'disabled');
                    //     // $('#person-pasport-type-drive').attr('disabled', 'disabled');
                    //     $('#person-pasport-ser').attr('readonly', 'readonly');
                    //     $('#person-pasport-number').attr('readonly', 'readonly');
                    //     $('#person-pasport-date').attr('readonly', 'readonly');
                    //     $('#person-money').attr('disabled', 'disabled');
                    //     $('#person-relationship').attr('readonly', 'readonly');
                    //     $('#person-birthday').attr('readonly', 'readonly');
                    //     $('#person-phone').attr('readonly', 'readonly');
                    //     $('#person-reg-address').attr('readonly', 'readonly');
                    //     $('#person-home-address').attr('readonly', 'readonly');
                    //     $('#person-work').attr('readonly', 'readonly');
                    //     $('#person-relationship-level').attr('disabled', 'disabled');
                    // }
    
                    $('.person-card-modal').addClass('show-modal');
                  
                },
                error: function (data) {
                   console.log(data);
                }
            });
        }
	});
};

export default getPersonInfo;