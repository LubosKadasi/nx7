export default {
    timeOptions: { hour: 'numeric', minute: '2-digit' },
    dateOptions: { weekday: 'long', month: 'numeric', day: 'numeric' },
    dateOptionsDay: { weekday: 'long' },
    dateOptionsMonth: { month: 'long' },
    w_icons: {
        "01d": "day",   	        //clear sky
        "01n": "night", 	
        "02d": "cloudy-day-1",      //few clouds
        "02n": "cloudy-night-2", 	
        "03d": "cloudy-day-1",      //scattered clouds
        "03n": "cloudy-night-2", 	
        "04d": "cloudy", 	        //broken clouds
        "04n": "cloudy",	
        "09d": "rainy-6",           //shower rain
        "09n": "rainy-6",
        "10d": "rainy-7",	        //rain
        "10n": "rainy-7",	
        "11d": "thunder",           //thunderstorm
        "11n": "thunder",	
        "13d": "snowy-6",	        //snow
        "13n": "snowy-6",	
        "50d": "day", 	            //mist 
        "50n": "night" 	
    },
    radio: [
        {
            name: "Junior",
            src: "https://icecast.stv.livebox.sk/junior_128.mp3",
            color: "#fff",
            bgcolor: "#daa520",
        },
        {
            name: "_FM",
            src: "https://icecast.stv.livebox.sk/fm_128.mp3",
            color: "#fff",
            bgcolor: "#e3002b",
        },
        {
            name: "Slovensko",
            src: "https://icecast.stv.livebox.sk/slovensko_128.mp3",
            color: "#fff",
            bgcolor: "#3a9dd8",
        }
    ],
    cpanel: [
        {
            title: "Vypnúť rozprávky",
            cmd: "https://stick/shutdown",
            icon: "power_settings_new",
            color: "#fff",
            bgcolor: "#daa520",
        }
    ],
    nav: {
        nav_timeout: 15000
    }
};
