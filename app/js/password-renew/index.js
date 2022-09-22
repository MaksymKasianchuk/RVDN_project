function passwordRenew(){
    //send reqest and show step two
    $('#password-renew-btn-step-one').on('click', function(e){
        e.preventDefault();
        $('.password-renew-step-one').hide();
        $('.password-renew-step-two').show();
    });
    //send reqest and show step three
    $('#password-renew-btn-step-two').on('click', function(e){
        e.preventDefault();
        $('.password-renew-step-two').hide();
        $('.password-renew-step-three').show();
    });

    //close step two and show step one
    $('.password-renew-btn.prevstep1').on('click', function(e){
        $('.password-renew-step-two').hide();
        $('.password-renew-step-one').show();
    });
    //close step three and show step two
    $('.password-renew-btn.prevstep2').on('click', function(e){
        $('.password-renew-step-three').hide();
        $('.password-renew-step-two').show();
    });
}

export default passwordRenew;