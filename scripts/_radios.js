import options from './options.js';

/*
    Radio section
*/

var buttons = '',
    buttonPause = `
        <button type="button" id="button-pause" class="radio__button--pause">
            Slovensko
            <span class="material-icons">pause_circle_outline</span>
        </button>
    `; 

Object.keys(options.radio).forEach(key => {
    buttons += `
            <button type="button" class="radio__button" data-src="${options.radio[key].src}" style="color:${options.radio[key].color};background-color:${options.radio[key].bgcolor}">
                <span class="material-icons">pause_circle_outline</span>
                ${options.radio[key].name}
            </button>
        `;
});
    
document.getElementById("radios").innerHTML = buttons;

document.querySelectorAll('.radio__button').forEach(item => {
    item.addEventListener('click', event => {
        
        var radio_src = item.getAttribute('data-src'),
            player = document.getElementById('radio-player');

        if (player.getAttribute('src') == radio_src){
            if (player.paused){
                player.play();
                item.classList.add('play');
            } else {
                player.pause();
                player.setAttribute('src', '');
                item.classList.remove('play');
            }
        } else if (player.getAttribute('src') == '') {
            player.setAttribute('src', radio_src);
            player.play();
            item.classList.add('play');
        } else {
            player.setAttribute('src', radio_src);
            player.play();
            document.querySelector('.radio__button.play').classList.remove('play');
            item.classList.add('play');
        }

    })
});

