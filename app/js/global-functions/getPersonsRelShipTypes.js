import { data } from "jquery";
import API_URL from "../api";
import notifications from "../notifications";

function getPersonsRelShipTypes() {
    let userToken = sessionStorage.getItem('token');
    if(userToken){
        let getPersonsRelShipTypesRequest = $.ajax({
            type: "GET",
            url: `${API_URL}persons/relationship_types`,
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
        return getPersonsRelShipTypesRequest;
    }
}
export default getPersonsRelShipTypes;