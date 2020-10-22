import options from './options.js';
/*
    Weatheer widget
*/

var forecast = new XMLHttpRequest();
forecast.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        var data = JSON.parse(this.responseText),
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
            
        //document.getElementById("forecast").innerHTML = forecast_content;
        
        /* Forecast  Chart */
        
        var _temps = [],
            _tempmin,
            _tempmax,
            _tempoffset = 1,
            _tempstep;
        
        // get all temps
        for (let i = 0; i < 48; i++){
            _temps.push(parseFloat(data.hourly[i].temp.toFixed(1)));
        }

        // Test minus tempss
        //_temps.push(-2);
        //_temps.push(-3);

        // get max & min
        _tempmax = Math.max(..._temps);
        _tempmin = Math.min(..._temps);

        // get scale
        _tempstep = 100 / (_tempmax + _tempoffset) - Math.abs(_tempmin - _tempoffset);
        _tempstep = _tempstep.toFixed(2);

        //console.log(_temps);
        //console.log(_tempstep);

        var forecast_col = '';
        //var forecast_col = `<div class="forecast__col--day"><span>Dnes</span></div>`;
        
        for (let i = 0; i < 48; i++){

            let _time = new Date(data.hourly[i].dt * 1000);

            //console.log(_time);

            if (_time.toLocaleTimeString('sk-SK', options.timeOptions) == '0:00'){
                forecast_col += `<div class="forecast__col--day"><span>${_time.toLocaleDateString('sk-SK', options.dateOptionsDay)}</span></div>`;
            };

            forecast_col += `
                    <div class="forecast__col">
                        <img class="forecast__icon" src="icons/static/${options.w_icons[data.hourly[i].weather[0].icon]}.svg" width="50" height="50" alt="" />
                        <div class="forecast__temp">${_temps[i].toFixed(1)} °C</div>
                        <div class="forecast__temp-col forecast__temp-col--plus" style="height:${_temps[i] * _tempstep}%;"></div>
                        <div class="forecast__temp-col forecast__temp-col--minus" style="height:${(_tempmin * -1) * _tempstep}%;">
                            <div class="forecast__temp-col forecast__temp-col--minus-col" style="height:${ (100 / _tempmin) * _temps[i]}%">
                        </div>
                        </div>
                        <div class="forecast__time">${_time.toLocaleTimeString('sk-SK', options.timeOptions)}</div>
                        <div class="forecast__wind">${data.hourly[i].wind_speed.toFixed(1)} m/s</div>
                    </div>
                `;
        }
        
        document.getElementById("forecast-chart").innerHTML = forecast_col;


        for (let i = 0; i < 12; i++){

            let _time = new Date(data.hourly[i].dt * 1000),
                _temp = '';

            if (data.hourly[i].temp <= 0 ) {
                _temp = 'minus';
            }

            forecast_home += `
                    <div class="forecast__hour">
                        <img class="forecast__icon" src="icons/static/${options.w_icons[data.hourly[i].weather[0].icon]}.svg" width="50" height="50" alt="" />
                        <div class="forecast__time">${_time.toLocaleTimeString('sk-SK', options.timeOptions)}</div>
                        <div class="forecast__temp ${_temp}" style="bottom:${data.hourly[i].temp.toFixed(1)}px;"></div>
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