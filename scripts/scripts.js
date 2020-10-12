import options from './options.js';

import { digitalClocks, getMeniny } from './_digitalclocks.js';
import { getForecast } from './_weather.js';
import { changeBgImage } from './_bgimage.js';
import { getRadios } from './_radios.js';

/* 
    Init 
*/

changeBgImage();
getMeniny();
getForecast();
getRadios();


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

document.querySelectorAll('.radio__button').forEach(item => {
    item.addEventListener('click', event => {
        
        var player_src = item.getAttribute('data-src'),
            player = document.getElementById('radio-player');

        if (player.getAttribute('src') == player_src){
            if (player.paused){
                player.play();
                item.classList.add('play');
            } else {
                player.pause();
                item.classList.remove('play');
            }
        } else if (player.getAttribute('src') == '') {
            player.setAttribute('src', player_src);
            player.play();
            item.classList.add('play');
        } else {
            player.setAttribute('src', player_src);
            player.play();
            document.querySelector('.radio__button.play').classList.remove('play');
            item.classList.add('play');
        }

    })
}); 







