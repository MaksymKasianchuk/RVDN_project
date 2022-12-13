import { data } from "jquery";
import API_URL from "../api";
import notifications from "../notifications";

function register(){
    $("#register-btn").on("click", function(e){
        e.preventDefault();
       
        if(!$('#register-birthday').val()){
            notifications.errorNotif('Некоректно введена дата народження!');
            return;
        }
        let lastname    = $('#register-lastname').val();
        let firstname   = $('#register-firstname').val();
        let surname     = $('#register-surname').val();
        let birthday    = new Date($('#register-birthday').val());
        let address     = $('#register-address').val();
        let workplace   = $('#register-workplace').val();
        let position    = $('#register-rank').val();
        let mail        = $('#register-mail').val();
        let phone       = $('#register-phone').val();
        let password    = $('#register-password').val();
        let confirm     = $('#register-password-confirm').val();
        if(!lastname || !firstname || !surname || !birthday || !address || !workplace || !position || !mail || !phone || !password || !confirm){
            notifications.errorNotif('Не заповнені всі поля форми!');
            return;
        }
        if(password !== confirm){
            notifications.errorNotif('Пароль та підтвердження паролю не збігаються!');
            return;
        }
        if(!isEmail(mail)){
            notifications.errorNotif('Email введено не коректно!');
            return;
        }
        if(!isPhone(phone)){
            notifications.errorNotif('Телефонний номер введено не коректно!');
            return;
        }
        
        // console.log(address);
        let data =  {
            "firstName": firstname,
            "middleName": surname, //?
            "lastName": lastname,
            "birthDate": birthday.toISOString(), //?
            "address" : address,
            "authorityName": workplace, 
            "positionName": position, //?
            "email": mail,
            "phoneNumber": phone,
            "password": password,
            "confirmPassword": confirm,
        }

        let registerRequest = $.ajax({
            type: "POST",
            url: `${API_URL}users/register`,
            crossDomain: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data),
            success: function(data){
                // console.log(data);
                sessionStorage.setItem("userId", data.user.id);
                sessionStorage.setItem("token", data.token);

                $('#register-lastname').val('');
                $('#register-firstname').val('');
                $('#register-surname').val('');
                $('#register-birthday').val('');
                $('#register-address').val('');
                $('#register-workplace').val('');
                $('#register-rank').val('');
                $('#register-mail').val('');
                $('#register-phone').val('');
                $('#register-password').val('');
                $('#register-password-confirm').val('');

                window.location.replace('/index.html');
            },
            error: function (data) {
                notifications.errorNotif();
                console.log(data);
            }
            
        });

    });
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
function isPhone(phone) {
    var regex = /\+38[0-9]{10}/;
    return regex.test(phone);
}
export default register;