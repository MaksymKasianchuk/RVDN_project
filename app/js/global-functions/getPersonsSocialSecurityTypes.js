import { data } from "jquery";
import API_URL from "../api";
import notifications from "../notifications";

function getPersonsSocialSecurityTypes() {
    let userToken = sessionStorage.getItem('token');
    if(userToken){
        let getPersonsSocialSecurityTypesRequest = $.ajax({
            type: "GET",
            url: `${API_URL}persons/social_security_types`,
            crossDomain: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            },
            success: function(data){
                return(data);
            },
            error: function (data) {
                notifications.errorNotif();
            }
        });
        return getPersonsSocialSecurityTypesRequest;
    }
}
export default getPersonsSocialSecurityTypes;