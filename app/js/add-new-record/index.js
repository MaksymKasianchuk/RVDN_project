import recordsArr from '../data.json';

function addNewRecord(){
    //add one more victim to form
    $('.add-victim-btn').on('click', function(e){
        const strTpl = `
        <div class="form-group top-line-form-group">
            <label class="form-label">Постраждала особа</label>
            <input type="text" name="newrecord-victim" id="" value="">
        </div>
        `;
        $(this).before(strTpl);
    });
    //add one more agressor to form
    $('.add-agressor-btn').on('click', function(e){
        const strTpl = `
        <div class="form-group">
            <label class="form-label">Особа кривдник</label>
            <input type="text" name="newrecord-agressor" id="" value="">
        </div>
        `;
        $(this).before(strTpl);
    });

    //------------------------CREATION OF  NEW RECORD
    $('#add-new-record-btn').on('click', function(e){
        e.preventDefault();
        let id = $('#newrecord-id').val();
        let register_date = $("#newrecord-register-date").val();
        let init_org = $("#newrecord-init-org").val();
        let execute_org = $("#newrecord-execute-org").val();
        let event_type = $("#newrecord-event-type").val();
        let qualification = $("#newrecord-qualification").val();
        let event_place = $("#newrecord-event-place").val();
        let event_reason = $("#newrecord-event-reason").val();
        let describe = $("#newrecord-describe").val();
        let measures = $("#newrecord-measures").val();
        let files = '';
        let victim_arr = [];
        let agressor_arr = [];
       
        $('input[name="newrecord-victim"]').each(function(){
            victim_arr.push($(this).val());
        });
        $('input[name="newrecord-agressor"]').each(function(){
            agressor_arr.push($(this).val());
        });

        const newRecord = {
            'id' : id,
            'register_date' : register_date,
            'init_org' : init_org,
            'execute_org' : execute_org,
            'event_type' : event_type,
            'qualification' : qualification,
            'event_place' : event_place,
            'event_reason' : event_reason,
            'describe' : describe,
            'measures' : measures,
            'files' : files,
            'victim_arr' : victim_arr,
            'agressor_arr' : agressor_arr,
        }

        recordsArr.push(newRecord);

        console.log(recordsArr);
    });

}
export default addNewRecord;