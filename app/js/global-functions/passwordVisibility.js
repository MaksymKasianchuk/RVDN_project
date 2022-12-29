function switchVisiblePassword(btn, toggleClass, inp){
    $(btn).on('click', function(){
        $(this).toggleClass(toggleClass);
        if( $(inp).attr("type") === "password"){
          $(inp).attr("type", "text");
          return;
        }
        if( $(inp).attr("type") === "text"){
          $(inp).attr("type", "password");
          return;
        }
      });
}
export default switchVisiblePassword;