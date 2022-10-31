import { data } from "jquery";
import API_URL from "../api";

function allInfo(){
    const userToken = sessionStorage.getItem('token');
    let allIcidentsRequest = $.ajax({
        type: "GET",
        url: `${API_URL}incidents`,
        crossDomain: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
        },
        data: JSON.stringify(data),
        success: function(data){
            // console.log(data);
            data.map((item) => {
                let {
                    executionDate,
                    executorAuthority,
                    id,
                    incidentPersons,
                    initiatorAuthority,
                    receiptDate,
                    registrationDate,
                    registryNumber,
                    status,
                } = { ...item };
                
                let regDate = registrationDate ? new Date(registrationDate) : 0;
                let regDateStr = regDate !== 0 ? `${regDate.getDay()}/${regDate.getMonth()}/${regDate.getFullYear()}` : '-';
                let execDate = executionDate ? new Date(executionDate) : 0;
                let execDateStr = execDate !== 0 ? `${execDate.getDay()}/${execDate.getMonth()}/${execDate.getFullYear()}` : '-';
                let receipDate = receiptDate ? new Date(receiptDate) : 0;
                let receipDateStr = receipDate !== 0 ? `${receipDate.getDay()}/${receipDate.getMonth()}/${receipDate.getFullYear()}` : '-';

                const victimArr = incidentPersons.Жертва;
                const agressorArr = incidentPersons.Кривдник;
                let victimBtns =``;
                let agressorBtns =``;
                victimArr.map(item=>{
                    victimBtns += `<button type="button" class="view-person-btn" data-person-role="victim" data-person-id="${item.id}">${item.fullName}<i class="fa-solid fa-users"></i></button>`
                    return victimBtns;
                });
                agressorArr.map(item=>{
                    agressorBtns += `<button type="button" class="view-person-btn" data-person-role="agressor" data-person-id="${item.id}">${item.fullName}<i class="fa-solid fa-users"></i></button>`
                    return agressorBtns;
                });

                const tplStr = `
                <tr data-record-id="${id}">
                    <td>${registryNumber}</td>
                    <td>${regDateStr}</td>
                    <td>${victimBtns}</td>
                    <td>${agressorBtns}</td>
                    <td>${initiatorAuthority}</td>
                    <td>${executorAuthority}</td>
                    <td>${receipDateStr}</td>
                    <td>${status}</td>
                    <td>${execDateStr}</td>
                </tr>
                `;
                $('#all-info-table').append(tplStr);

                getPersonInfo(true);
            });
        },
        error: function (data) {
           console.log(data);
        }
    });
};

function getPersonInfo(readonly = false){
    $('.view-person-btn').on('click', function(e){
        let personId = Number($(this).attr('data-person-id'));
        let personRole = $(this).attr('data-person-role');
        const userToken = sessionStorage.getItem('token');
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
                let birthDateStr = bdDate !== 0 ? `${bdDate.getDay()}.${bdDate.getMonth()}.${bdDate.getFullYear()}` : '-';

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
                if(readonly){
                    $('#person-role').attr('disabled', 'disabled');
                    // $('#person-children-yes').attr('disabled', 'disabled');
                    // $('#person-children-no').attr('disabled', 'disabled');
                    $('#person-name').attr('readonly', 'readonly');
                    // $('#person-pasport-type-pasport').attr('disabled', 'disabled');
                    // $('#person-pasport-type-card').attr('disabled', 'disabled');
                    // $('#person-pasport-type-drive').attr('disabled', 'disabled');
                    $('#person-pasport-ser').attr('readonly', 'readonly');
                    $('#person-pasport-number').attr('readonly', 'readonly');
                    $('#person-pasport-date').attr('readonly', 'readonly');
                    $('#person-money').attr('disabled', 'disabled');
                    $('#person-relationship').attr('readonly', 'readonly');
                    $('#person-birthday').attr('readonly', 'readonly');
                    $('#person-phone').attr('readonly', 'readonly');
                    $('#person-reg-address').attr('readonly', 'readonly');
                    $('#person-home-address').attr('readonly', 'readonly');
                    $('#person-work').attr('readonly', 'readonly');
                    $('#person-relationship-level').attr('disabled', 'disabled');
                }

                $('.person-card-modal').addClass('show-modal');
              
            },
            error: function (data) {
               console.log(data);
            }
        });


	});
};


export default allInfo;