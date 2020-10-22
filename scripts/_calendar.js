import options from './options.js';
/*
    Calendar section
    https://javascript.info/task/calendar-table
*/

let today = new Date();
    today.day = today.getDate();
    today.month = today.getMonth() + 1;
    today.year = today.getFullYear();

    
function createCalendar(elem, year, month) {
    
    let mon = month - 1; // months in JS are 0..11, not 1..12
    let d = new Date(year, mon);
    
    document.querySelector('#section-calendar .section__headline').textContent += ' - ' + d.toLocaleDateString('sk-SK', options.dateOptionsMonth);

    let table = `
                <div id='calendar-month' class="calendar__month">
                    <div class="calendar__day"><h5 class="calendar__day__header">Pondelok</h5></div>
                    <div class="calendar__day"><h5 class="calendar__day__header">Utorok</h5></div>
                    <div class="calendar__day"><h5 class="calendar__day__header">Streda</h5></div>
                    <div class="calendar__day"><h5 class="calendar__day__header">Štvrtok</h5></div>
                    <div class="calendar__day"><h5 class="calendar__day__header">Piatok</h5></div>
                    <div class="calendar__day"><h5 class="calendar__day__header">Sobota</h5></div>
                    <div class="calendar__day"><h5 class="calendar__day__header">Nedeľa</h5></div>                           
                `;

    // spaces for the first row
    // from Monday till the first day of the month
    // * * * 1  2  3  4
    for (let i = 0; i < getDay(d); i++) {
        table += '<div class="calendar__day"><h5 class="calendar__day__header"></h5></div>';
    }

    // <td> with actual dates
    while (d.getMonth() == mon) {
        if (d.getDate() == today.day){
            table += `<div class="calendar__day today"><h5 class="calendar__day__header">${d.getDate()}</h5></div>`;
        } else {
            table += `<div class="calendar__day"><h5 class="calendar__day__header">${d.getDate()}</h5></div>`;
        }

        //if (getDay(d) % 7 == 6) { // sunday, last day of week - newline
        //    table += '</tr><tr>';
        //}

        d.setDate(d.getDate() + 1);
    }

    // add spaces after last days of month for the last row
    // 29 30 31 * * * *
    //if (getDay(d) != 0) {
    //    for (let i = getDay(d); i < 7; i++) {
    //        table += '<td></td>';
    //    }
    //}

    // close the table
    table += '</div>';

    elem.innerHTML = table;
};

function getDay(date) { // get day number from 0 (monday) to 6 (sunday)
    let day = date.getDay();
    if (day == 0) day = 7; // make Sunday (0) the last day
    return day - 1;
}

createCalendar(calendar, today.year, today.month);