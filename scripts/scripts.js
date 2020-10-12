import options from './options.js';

import { digitalClocks, getMeniny } from './_digitalclocks.js';
import { getForecast } from './_weather.js';
import { changeBgImage } from './_bgimage.js';

/* 
    Init 
*/

changeBgImage();
getMeniny();
getForecast();


/*
    Main Timer
*/

var updateScreen = setInterval(() => {

    let time = Math.floor(Date.now() / 1000);
    
    /* Digital Clocks */
    digitalClocks(options.dateOptions, options.timeOptions);
    
    /* every 10 min */
    if (time % 600 == 0){
        getForecast();
    };

    /* every 12 hours */
    if (time % 43200 == 0){
        changeBgImage();
    };

    /* every day */
    if (time % 86400 == 0){
        getMeniny();
    };
    
}, 1000);

/*
    Nav
*/

document.querySelectorAll('[data-target-section]').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        var section_id = item.getAttribute('data-target-section');

        if (!(item.classList.contains('show'))){
            document.querySelectorAll('.section.show, .section__link.show').forEach(item => {
                item.classList.remove('show');
                item.classList.add('show-last');
                setTimeout(function(){ 
                    item.classList.remove('show-last')
                }, 500);            
            });
            
            item.classList.add('show');
            document.querySelector(section_id).classList.add('show');
        }
    })
}); 








