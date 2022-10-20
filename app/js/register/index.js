import { data } from "jquery";

function register(){
    $("#register-btn").on("click", function(e){
        e.preventDefault();
        let lastname    = $('#register-lastname').val();
        let firstname   = $('#register-firstname').val();
        let surname     = $('#register-surname').val();
        let birthday    = new Date($('#register-birthday').val()); //.split('-').reverse().join('/')
        let workplace   = $('#register-workplace').val();
        let position    = $('#register-rank').val();
        let mail        = $('#register-mail').val();
        let phone       = $('#register-phone').val();
        let password    = $('#register-password').val();
        let confirm     = $('#register-password-confirm').val();
        // console.log(birthday);
        let data =  {
            "firstName": firstname,
            "middleName": surname, //?
            "lastName": lastname,
            "birthDate": birthday.toISOString(), //?
            "authorityName": workplace, 
            "positionName": position, //?
            "email": mail,
            "phoneNumber": phone,
            "password": password,
            "confirmPassword": confirm,
        }

        let registerRequest = $.ajax({
            type: "POST",
            url: "https://df6e-195-114-147-16.eu.ngrok.io/users/register",
            crossDomain: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data),
            success: function(data){
                console.log(data);
                sessionStorage.setItem("userId", data.id);
                sessionStorage.setItem("token", data.token);

                $('#register-lastname').val('');
                $('#register-firstname').val('');
                $('#register-surname').val('');
                $('#register-birthday').val('');
                $('#register-workplace').val('');
                $('#register-rank').val('');
                $('#register-mail').val('');
                $('#register-phone').val('');
                $('#register-password').val('');
                $('#register-password-confirm').val('');

                window.location.replace('/');
            },
            error: function (data) {
               console.log(data);
            }
            
        });

    });
}
export default register;