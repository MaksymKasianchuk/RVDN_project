import { data } from "jquery";
import API_URL from "../api";

function search(){
    let userToken = sessionStorage.getItem('token');
    const personsArr = [];

    if(userToken){
        let getAllPersonsRequest = $.ajax({
            type: "GET",
            url: `${API_URL}persons`,
            crossDomain: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            },
            success: function(data){
                data.map(item => {
                    personsArr.push({
                        'fullName': item.fullName,
                        'id': item.id,
                        'normalizedName': item.fullName.toLowerCase()
                    });
                });
            },
            error: function (data) {
                console.log(data);
            }
        });
        getAllPersonsRequest.done(function(){
            $('#search-person-name').on('input', function(){
                $('.search-res').html('');
                if($(this).val().length > 1){
                    personsArr.map(elem=>{
                        let name = elem.fullName;
                        let normalizedName = elem.normalizedName;
                        if (normalizedName.includes($(this).val().toLowerCase())){
                            $('.search-res').append(`<li class="search-res-item" data-person-id="${elem.id}"><i class="fas fa-user"></i> ${name}</li>`);
                            $('.search-res-item').each(function(){
                                if($(this).attr('data-listener') === 'true'){
                                    return ;
                                } else{
                                    $(this).on('click', function(){
                                        $('#search-person-name').val($(this).text());
                                        $('#search-person-name').attr('data-person-id', $(this).attr('data-person-id'));
                                        $('.search-res').html('');
                                    });
                                    $(this).attr('data-listener', 'true');
                                }
                            });
                        }
                    });
                }
            });
            console.log(personsArr);    
        });
        
    }

    $('.submit-search-btn').on('click', function(e){
        e.preventDefault();
        let personId = Number($('#search-person-name').attr('data-person-id')); 
    
        if(personId && userToken){
            let getPersonInfoRequest = $.ajax({
                type: "GET",
                url: `${API_URL}persons/${personId}`,
                crossDomain: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
                success: function(data){
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

    $('.search-btn').on('click', function(){
        $('.search-modal-wrap').toggleClass('show');
    });
}
export default search;