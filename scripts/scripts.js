import options from './options.js';

import { digitalClocks, getMeniny } from './_digitalclocks.js';
import { getForecast } from './_weather.js';
import { changeBgImage } from './_bgimage.js';
import { } from './_radios.js';
import { } from './_nav.js';
import { } from './_battery.js';
import { } from './_cpanel.js';

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









