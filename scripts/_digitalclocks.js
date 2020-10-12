/*
    Digital Clocks
*/

export function digitalClocks(dateOptions, timeOptions) {
    var today = new Date();
        
    document.getElementById("clocks-digital").innerHTML = today.toLocaleTimeString('sk-SK', timeOptions);
    document.getElementById("clocks-date").innerHTML = today.toLocaleDateString('sk-SK', dateOptions);
};

/*
    Meniny
*/

var meniny = new XMLHttpRequest();
meniny.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText),
            today = new Date(),
            tday = today.getDate(),
            tmonth = today.getMonth() + 1;

        document.getElementById("clocks-meniny").innerHTML = data[tmonth][tday];
    }
};

export function getMeniny(){
    meniny.open("GET", "scripts/meniny.json", true);
    meniny.send();
};