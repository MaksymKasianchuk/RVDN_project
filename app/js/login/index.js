import { data } from "jquery";
import API_URL from '../api'
function login(){
    $('#login-btn').on('click', function(e){
        e.preventDefault();
        let login = $('#login-user-login').val();
        let password = $('#login-user-password').val();

        if(login && password){
            let data = {
                "userName": `${login}`,
                "password": `${password}`
            }

            let loginRequest = $.ajax({
                type: "POST",
                url: `${API_URL}users/login`,
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
                    window.location.replace('/index.html');
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