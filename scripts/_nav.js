import options from './options.js';

/*
    Nav
*/

var nav_timeout = options.nav.nav_timeout,
    nav_tohome = setTimeout(showHomeSection, nav_timeout);

function showHomeSection(){
    if (!(document.querySelector('#section-home').classList.contains('show'))){
        hideAllSections();
        document.querySelector('#section-home').classList.add('show');
        document.querySelector('nav [data-target-section="#section-home"]').classList.add('show');
    };
};

function hideAllSections(){
    document.querySelectorAll('.section.show, .section__link.show, [data-target-section].show').forEach(item => {
        item.classList.remove('show');
        item.classList.add('show-last');
        setTimeout(function(){ 
            item.classList.remove('show-last')
        }, 500);  
    });
};

document.querySelectorAll('[data-target-section]').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        var section_id = item.getAttribute('data-target-section');

        if (!(item.classList.contains('show'))){
            
            hideAllSections();
            
            document.querySelectorAll('[data-target-section="' + section_id + '"]').forEach(item => {
                item.classList.add('show');
            });
            document.querySelector(section_id).classList.add('show');

            clearTimeout(nav_tohome);
            nav_tohome = setTimeout(showHomeSection, nav_timeout);
        }
    })
});

document.querySelector('body').addEventListener('pointerenter', event => {
    if ((event.target.getAttribute('id') != 'section-home') || (event.target.getAttribute('data-target-section') != '#section-home')){
        clearTimeout(nav_tohome);
        nav_tohome = setTimeout(showHomeSection, nav_timeout);
    }
});