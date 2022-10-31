function addNewPerson(){
    //-----------add-relative-btn-in-fom
    $('.add-relative-btn').on('click', function(e){
        const strTpl = `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="form-group">
                    <label class="form-label">ПІБ</label>
                    <input type="text" name="newperson-relationship" id="" value="">
                </div>
                <div class="form-group newperson-relationship-level">
                    <label class="form-label">Рівень зв'язку</label>
                    <select name="newperson-relationship-level" id="">
                        <option value="Чоловік">Чоловік</option>
                        <option value="Дружина">Дружина</option>
                        <option value="Брат">Брат</option>
                        <option value="Сестра">Сестра</option>
                        <option value="Інше..." selected>Інше...</option>
                    </select>
                </div>
            </div>
        `;
        $(this).parents('.add-relateve-col').before(strTpl);
    });

    let userToken = sessionStorage.getItem('token');
    let userId = sessionStorage.getItem('userId');

    if(userToken && userId) {
        $('.user-header-logined').show();
        $('.user-header-unlogined').hide();
    } else {
        $('.user-header-unlogined').show();
        $('.user-header-logined').hide();
    }
}
export default addNewPerson;