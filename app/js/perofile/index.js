import e from "cors";
import { data } from "jquery";
import API_URL from "../api";

function profile(){
    let userToken = sessionStorage.getItem('token');
    let id = sessionStorage.getItem('userId');

    if(userToken && id){
        let getUserRequest = $.ajax({
            type: "GET",
            url: `${API_URL}users/${id}`,
            crossDomain: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            },
            success: function(data){
                // console.log(data);
                const { 
                    authorityName,
                    birthDate,
                    address,
                    email,
                    firstName,
                    id,
                    lastName,
                    middleName,
                    phoneNumber,
                    positionName
                } = { ...data };
                let bdDate = birthDate ? new Date(birthDate) : 0;
                let bdDateday = ("0" + bdDate.getDate()).slice(-2);
                let bdDatemonth = ("0" + (bdDate.getMonth() + 1)).slice(-2);
                let birthDateStr = bdDate.getFullYear()+"-"+(bdDatemonth)+"-"+(bdDateday);
                $('#user-lastname').val(lastName);
                $('#user-firstname').val(firstName);
                $('#user-surname').val(middleName);
                $('#user-birthday').val(birthDateStr);
                $('#user-address').val(address);
                $('#user-phone').val(phoneNumber);
                $('#user-mail').val(email);
                $('#user-address').val();
                $('#user-workplace').val(authorityName);
                $('#user-position').val(positionName);
            },
            error: function (data) {
               console.log(data);
            }
        });

        $('.workplace-info-change-btn').on('click', function(e){
            e.preventDefault();
            let data = {
                'authorityName' : $('#user-workplace').val(),
                'positionName' : $('#user-position').val(),
            };
            let updateUserWorkInfoRequest = $.ajax({
                type: "PUT",
                url: `${API_URL}users/update/${id}/work_info`,
                crossDomain: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
                data: JSON.stringify(data),
                success: function(data){
                    // console.log(data);
                },
                error: function (data) {
                   console.log(data);
                }
            });
        });

        $('.contact-info-change-btn').on('click', function(e){
            e.preventDefault();
            let data = {
                'email' : $('#user-mail').val(),
                'phoneNumber' : $('#user-phone').val(),
                'address' : $('#user-address').val(),
            };
            let updateUserWorkInfoRequest = $.ajax({
                type: "PUT",
                url: `${API_URL}users/update/${id}/contact_info`,
                crossDomain: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
                data: JSON.stringify(data),
                success: function(data){
                    // console.log(data);
                },
                error: function (data) {
                   console.log(data);
                }
            });
        });

    }
}
export default profile;