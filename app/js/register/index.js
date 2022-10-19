import { data } from "jquery";

function register(){
    $("#register-btn").on("click", function(e){
        e.preventDefault();
        let lastname = $('#register-lastname').val();
        let firstname = $('#register-firstname').val();
        let surname = $('#register-surname').val();
        let birthday = $('#register-birthday').val();
        let workplace = $('#register-workplace').val();
        let positionId = $('#register-rank').val();
        let mail = $('#register-mail').val();
        let phone = $('#register-phone').val();
        let password = $('#register-password').val();
        let confirm = $('#register-password-confirm').val();
      
            let data = 
            {
                "userName": "user02", //?
                "firstName": firstname,
                "middleName": surname, //?
                "lastName": lastname,
                "birthDate": "2022-10-19T11:41:17.720Z", //?
                "authorityId": 0, //?
                "positionId": 0, //?
                "email": mail,
                "phoneNumber": phone,
                "password": password,
                "confirmPassword": confirm,
                "address": workplace //?
              }

            //має віддавати токен та id
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
                    sessionStorage.setItem("id", data.id);
                },
                error: function (data) {
                   console.log(data);
                }
                
            });

    });
}
export default register;