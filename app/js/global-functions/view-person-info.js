import { data } from "jquery";
import API_URL from "../api";

function getPersonInfo(){
     $('.view-person-btn').each(function(){
        if($(this).attr('data-listener') === 'true'){
            return ;
        } else{
            viewPersonListener(this);
            $(this).attr('data-listener', 'true');
        }
    });
    function viewPersonListener(btnSelector){
        $(btnSelector).on('click', function(e){
            let personId = Number($(this).attr('data-person-id')); 
            let personRole = $(this).attr('data-person-role');
            const userToken = sessionStorage.getItem('token');
        
            if(personId && personRole && userToken){
                let getPersonInfoRequest = $.ajax({
                    type: "GET",
                    url: `${API_URL}persons/${personId}`,
                    crossDomain: true,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
                    },
                    // data: JSON.stringify(data),
                    success: function(data){
                        // console.log(data);
                        const {
                            documentIssueDate,
                            documentIssuingAuthority,
                            documentNumber,
                            documentSeries,
                            documentType,
                            birthDate,
                            fullName,
                            hasChildren,
                            id,
                            livingAddress,
                            phoneNumber,
                            registrationAddress,
                            relationships,
                            socialSecurity,
                            workingPlace,
                        } = { ...data };
                        let bdDate = birthDate ? new Date(birthDate) : new Date();
                        let bdDateday = ("0" + bdDate.getDate()).slice(-2);
                        let bdDatemonth = ("0" + (bdDate.getMonth() + 1)).slice(-2);
                        let birthDateStr = bdDate.getFullYear()+"-"+(bdDatemonth)+"-"+(bdDateday) ;

                        let docDate = documentIssueDate ? new Date(documentIssueDate) : new Date();
                        let docDateday = ("0" + docDate.getDate()).slice(-2);
                        let docDatemonth = ("0" + (docDate.getMonth() + 1)).slice(-2);
                        let docDateStr = docDate.getFullYear()+"-"+(docDatemonth)+"-"+(docDateday) ;

                        if(personRole === 'victim') { $('#person-role').val('Постраждала особа'); }
                        else if(personRole === 'agressor') { $('#person-role').val('Особа кривдник'); }
                        if(hasChildren) { $('#person-children-yes').attr('checked', 'checked'); } 
                        else { $('#person-children-no').attr('checked', 'checked'); }
                        switch(documentType){
                            case "Паспорт" :
                                $('#person-pasport-type-pasport').attr('checked', 'checked');
                            break;
                            case "ID-картка" :
                                $('#person-pasport-type-card').attr('checked', 'checked');
                            break;
                            case "Посвідчення водія" :
                                $('#person-pasport-type-drive').attr('checked', 'checked');
                            break;
                        }

                        let relationshipsMarkup = '';
                        // console.log(relationships);
                        if(relationships){
                            relationships.map(element => {
                                relationshipsMarkup += `
                                <div class="col-md-4 col-12">
                                    <div class="form-group">
                                        <label class="form-label">ПІБ</label>
                                        <input type="text" name="person-relationship" readonly data-person-id="${element.person.id}" value="${element.person.fullName}">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Рівень зв'язку</label>
                                        <input type="text" name="person-relationship-level" readonly data-person-id="${element.person.id}" value="${element.type}">
                                    </div>
                                </div>
                                `; 
                            });
                        }

                        $('#person-name').val(fullName);
                        $('#person-pasport-ser').val(documentSeries);
                        $('#person-pasport-number').val(documentNumber);
                        $('#person-pasport-date').val(docDateStr);
                        $('#person-money').val(socialSecurity);
                        $('#person-birthday').val(birthDateStr);
                        $('#person-phone').val(phoneNumber);
                        $('#person-reg-address').val(registrationAddress);
                        $('#person-home-address').val(livingAddress);
                        $('#person-work').val(workingPlace);
                        $('#person-relationship').html(relationshipsMarkup);
                        $('#person-card-modal').attr('data-person-id', id);
        
                        $('.person-card-modal').addClass('show-modal');
                    
                    },
                    error: function (data) {
                    console.log(data);
                    }
                });
            }
        });
    }
};

export default getPersonInfo;