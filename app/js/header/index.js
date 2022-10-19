import { data } from "jquery";
function header() {
    $('.user-header-logout').each(function() {
        $(this).on('click', function(e){
            e.preventDefault();
            sessionStorage.removeItem("token");
            window.location.replace('/login.html');
        });
    });
}
export default header;