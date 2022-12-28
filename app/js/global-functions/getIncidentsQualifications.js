import { data } from "jquery";
import API_URL from "../api";
import notifications from "../notifications";

function getIncidentsQualifications() {
    let userToken = sessionStorage.getItem('token');
    if(userToken){
        let getIncidentsQualificationsRequest = $.ajax({
            type: "GET",
            url: `${API_URL}incidents/qualifications`,
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
        return getIncidentsQualificationsRequest;
    }
}
export default getIncidentsQualifications;