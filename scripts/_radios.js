import options from './options.js';

/*
    Radio section
*/

export function getRadios(){
    
    var buttons = '';

    Object.keys(options.radio).forEach(key => {
        buttons += `
                <button type="button" class="radio__button" data-src="${options.radio[key].src}" style="color:${options.radio[key].color};background-color:${options.radio[key].bgcolor}">
                    <span class="material-icons">pause_circle_outline</span>
                    ${options.radio[key].name}
                </button>
            `;
    });
        
    document.getElementById("radios").innerHTML = buttons;

};

