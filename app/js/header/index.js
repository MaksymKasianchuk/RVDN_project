import { data } from "jquery";
function header() {
    
    $('.user-header-logout').each(function() {
        $(this).on('click', function(e){
            e.preventDefault();
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("userId");
            window.location.replace('/login.html');
        });
    });
    
    let userToken = sessionStorage.getItem('token');
    let userId = sessionStorage.getItem('userId');

    if(userToken && userId) {
        $('.user-header-logined').show();
        $('.user-header-unlogined').hide();
    } else {
        $('.user-header-unlogined').show();
        $('.user-header-logined').hide();
    }
}
export default header;