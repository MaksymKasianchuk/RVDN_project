import e from "cors";
import { data } from "jquery";
import API_URL from "../api";
import notifications from "../notifications";

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
            //    console.log(data);
            }
        });

        $('.workplace-info-change-btn').on('click', function(e){
            e.preventDefault();
            let authorityName =  $('#user-workplace').val();
            let positionName = $('#user-position').val();
            if(!authorityName || !positionName){
                notifications.emptyNotif('Заповніть необхідні поля');
                return;
            }
            let data = {
                'authorityName' : authorityName,
                'positionName' : positionName,
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
                    notifications.succsessNotif('Дані про місце працевлаштування успішно оновлено!');
                },
                error: function (data) {
                    notifications.emptyNotif();
                }
            });
        });

        $('.contact-info-change-btn').on('click', function(e){
            e.preventDefault();
            let email =  $('#user-mail').val();
            let phoneNumber = $('#user-phone').val();
            let address = $('#user-address').val();

            if(!email || !phoneNumber || !address){
                notifications.emptyNotif('Заповніть необхідні поля');
                return;
            }
            if(!isEmail(email)){
                notifications.emptyNotif('Email введено не коректно!');
                return;
            }
            if(!isPhone(phoneNumber)){
                notifications.emptyNotif('Телефонний номер введено не коректно!');
                return;
            }

            let data = {
                'email' : email,
                'phoneNumber' : phoneNumber,
                'address' : address,
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
                    notifications.succsessNotif('Контактні дані успішно оновлено!');
                },
                error: function (data) {
                    notifications.emptyNotif();
                    console.log(data);
                }
            });
        });

    }
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
function isPhone(phone) {
    var regex = /\+38[0-9]{10}/;
    return regex.test(phone);
}
export default profile;