import { data } from "jquery";

function login(){
    $('#login-btn').on('click', function(e){
        e.preventDefault();
        // window.location.href
        // window.location.replace('/');
        let login = $('#login-user-login').val();
        let password = $('#login-user-password').val();

        if(login && password){
            let data = {
                "userName": `${login}`,
                "password": `${password}`
            }

            let loginRequest = $.ajax({
                type: "POST",
                url: "https://df6e-195-114-147-16.eu.ngrok.io/users/login",
                crossDomain: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data),
                success: function(data){
                    // console.log(data);
                    sessionStorage.setItem("userId", data.userId);
                    sessionStorage.setItem("token", data.token);
                    $('#login-user-login').val('');
                    $('#login-user-password').val('');
                    window.location.replace('/');
                },
                error: function (data) {
                   console.log(data);
                }
                
            });
            // loginRequest.done(
            //     function(){
            //         token = sessionStorage.getItem("token");
            //         console.log(token);
            //     }
            // );

        }
    });
}
export default login;