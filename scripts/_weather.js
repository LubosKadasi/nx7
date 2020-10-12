import options from './options.js';
/*
    Weatheer widget
*/

var forecast = new XMLHttpRequest();
forecast.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        var data = JSON.parse(this.responseText),
            forecast_content = '',
            forecast_home = '',
            _time_sunrise = new Date(data.current.sunrise * 1000),
            _time_sunset = new Date(data.current.sunset * 1000);
        
        document.getElementById("weather-home").innerHTML = `
            <div class="weather__desc">
                <img class="weather__icon" src="icons/static/${options.w_icons[data.current.weather[0].icon]}.svg" width="64" height="64" alt="" />
                <span>${data.current.weather[0].description}</span>
            </div>
            <div class="weather__temp">
            ${data.current.temp.toFixed(1)} °C
            </div>
            <div class="weather__more">
                <span class="weather__wind">
                    <span class="material-icons" style="transform: rotate(${data.current.wind_deg - 180}deg)">navigation</span>
                    <strong>${data.current.wind_speed.toFixed(1)} m/s</strong>
                </span>
                <span class="weather__hum">
                    <span class="material-icons">waves</span>
                    <strong>${data.current.humidity} %</strong>
                </span>     
                <div class="weather__sun">
                    <span class="weather__sunrise">
                        <span class="material-icons">wb_sunny</span>
                        <strong>${_time_sunrise.toLocaleTimeString('sk-SK', options.timeOptions)}</strong>
                    </span>
                    <span class="weather__sunset">
                        <span class="material-icons">brightness_2</span>
                        <strong>${_time_sunset.toLocaleTimeString('sk-SK', options.timeOptions)}</strong>
                    </span>     
                </div>
                <!--<div class="weather__location">
                    Bratislava
                </div>-->
            </div>
            `;

        for (let i = 0; i < 48; i++){

            var _time = new Date(data.hourly[i].dt * 1000);

            forecast_content += `
                    <div class="forecast__hour">
                        <img class="forecast__icon" src="icons/static/${options.w_icons[data.hourly[i].weather[0].icon]}.svg" width="50" height="50" alt="" />
                        <div class="forecast__time">${_time.toLocaleTimeString('sk-SK', options.timeOptions)}</div>
                        <div class="forecast__temp">${data.hourly[i].temp.toFixed(1)} °C</div>
                        <div class="forecast__wind">${data.hourly[i].wind_speed.toFixed(1)} m/s</div>
                    </div>
                `;

            }

        document.getElementById("forecast").innerHTML = forecast_content;

        for (let i = 0; i < 12; i++){

            var _time = new Date(data.hourly[i].dt * 1000);

            forecast_home += `
                    <div class="forecast__hour">
                        <img class="forecast__icon" src="icons/static/${options.w_icons[data.hourly[i].weather[0].icon]}.svg" width="50" height="50" alt="" />
                        <div class="forecast__time">${_time.toLocaleTimeString('sk-SK', options.timeOptions)}</div>
                        <div class="forecast__temp" style="bottom:${data.hourly[i].temp.toFixed(1)}px;"></div>
                    </div>
                `;

            }

        document.getElementById("forecast-home").innerHTML = forecast_home;
    } else {
        //document.getElementById('header').innerHTML = this.status + ' ' 
            //+  this.readyState + ' ' 
            //+  this.statusText + ' ' 
            //+  this.responseText + ' ' 
            //+  this.responseURL + ' ';
        //console.log(this);
    }
};

export function getForecast(){
    forecast.open("GET", "//api.openweathermap.org/data/2.5/onecall?lat=48.33&lon=17.17&exclude=minutely,daily&appid=b1c74e01998f6dc8db3e4c990f5f6964&units=metric&lang=sk", true);
    forecast.send();

    var updated = new Date();

    document.getElementById('app-updated').innerHTML = 'aktualizované: ' + updated.toLocaleString('sk-SK');
};