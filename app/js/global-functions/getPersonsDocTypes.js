import { data } from "jquery";
import API_URL from "../api";
import notifications from "../notifications";

function getPersonsDocTypes() {
    let userToken = sessionStorage.getItem('token');
    if(userToken){
        let getPersonsDocTypesRequest = $.ajax({
            type: "GET",
            url: `${API_URL}persons/document_types`,
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
        return getPersonsDocTypesRequest;
    }
}
export default getPersonsDocTypes;