function login(){
    $('#login-btn').on('click', function(e){
        e.preventDefault();
        // window.location.href
        window.location.replace('/');
    });
}
export default login;