import { data } from "jquery";
import API_URL from "../api";
import notifications from "../notifications";

function getIcidentsTypes() {
    let userToken = sessionStorage.getItem('token');
    if(userToken){
        let getIcidentsTypesRequest = $.ajax({
            type: "GET",
            url: `${API_URL}incidents/types`,
            crossDomain: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            },
            success: function(data){
                // console.log(data);
                return(data);
            },
            error: function (data) {
                notifications.errorNotif();
            }
        });
        return getIcidentsTypesRequest;
    }
}
export default getIcidentsTypes;