import { data } from "jquery";
import API_URL from "../api";
import getPersonInfo from "../global-functions/view-person-info";

function myInfo(){
    const userToken = sessionStorage.getItem('token');
    if(userToken){
        let allIcidentsRequest = $.ajax({
            type: "GET",
            url: `${API_URL}incidents`,
            crossDomain: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            },
            // data: JSON.stringify(data),
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
                        <td>${id}</td>
                        <td>${regDateStr}</td>
                        <td>${registryNumber}</td>
                        <td>${victimBtns}</td>
                        <td>${agressorBtns}</td>
                        <td>${initiatorAuthority}</td>
                        <td>${receipDateStr}</td>
                        <td>${status}</td>
                        <td>${execDateStr}</td>
                        <td><button type="button" data-record-id="${id}" class="edit-record-btn"><i class="fa-solid fa-pencil"></i></button></td>
                    </tr>
                    `;
                    $('.my-info-table').append(tplStr);
    
                    getPersonInfo();
                });
            },
            error: function (data) {
               console.log(data);
            }
        });
    }
  
}
export default myInfo;