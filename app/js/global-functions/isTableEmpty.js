import { data } from "jquery";

function isTableEmpty(tableBodySelector){
    const userToken = sessionStorage.getItem('token');
    if($.trim($(tableBodySelector).html())=='' && !userToken){
        $(tableBodySelector).parents('.table-wrap').hide();
        $(tableBodySelector).parents('.col-12').find('.no-auth').show();
        $(tableBodySelector).parents('.col-12').find('.no-records').hide();
    } else if($.trim($(tableBodySelector).html())=='' && userToken){
        $(tableBodySelector).parents('.table-wrap').hide();
        $(tableBodySelector).parents('.col-12').find('.no-records').show();
        $(tableBodySelector).parents('.col-12').find('.no-auth').hide();
    } else if($.trim($(tableBodySelector).html())!='' && userToken){
        $(tableBodySelector).parents('.table-wrap').show();
        $(tableBodySelector).parents('.col-12').find('.no-records').hide();
        $(tableBodySelector).parents('.col-12').find('.no-auth').hide();
    }

}

export default isTableEmpty;