import options from './options.js';

/*
    Shutdown PC
*/

var buttons = '';

Object.keys(options.cpanel).forEach(key => {
    buttons += `
            <button type="button" class="devices__button" data-cmd="${options.cpanel[key].cmd}" style="color:${options.cpanel[key].color};background-color:${options.cpanel[key].bgcolor}">
                <span class="material-icons">${options.cpanel[key].icon}</span>
                ${options.cpanel[key].title}
            </button>
        `;
});

function sendCommand(command){
    pcCommand.open("GET", command, true);
    pcCommand.send();
};

document.getElementById("cpanel").innerHTML = buttons;

document.querySelectorAll('.devices__button').forEach( item => {
    item.addEventListener('click', function(){
        let cmd = this.dataset.command;
        sendCommand(cmd);
    });
})