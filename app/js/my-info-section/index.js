import recordsArr from '../data.json';

function myInfo(){
    recordsArr.map((record) =>{
        const {
            id,
            register_date,
            init_org,
            execute_org,
            event_type,
            qualification,
            event_place,
            event_reason,
            victim_arr,
            agressor_arr,
            describe,
            measures,
            files,
        } = record;
        let vic = '';
        victim_arr.map(elem => {
            return vic += `<button type="button" class="view-person-btn">${elem} <i class="fa-solid fa-users"></i></button>`;
        });
        let agr = '';
         agressor_arr.map(elem => {
            return agr += `<button type="button" class="view-person-btn">${elem} <i class="fa-solid fa-users"></i></button>`;
        });
        const tplStr = `
        <tr>
            <td>id</td>
            <td>${register_date}</td>
            <td>${id}</td>
            <td>${vic}</td>
            <td>${agr}</td>
            <td>${init_org} <i class="fa-solid fa-angle-down"></i></td>
            <td>14/09/2022</td>
            <td>виконано <i class="fa-solid fa-angle-down"></i></td>
            <td>15/09/2022</td>
            <td><button type="button" class="edit-record-btn"><i class="fa-solid fa-pencil"></i></button></td>
        </tr>
        `;
        $('.my-info-table').append(tplStr);
    });
}
export default myInfo;