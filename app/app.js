var dayTemplate = '<div class="col-xs-12 col-sm-6 col-md-2">' +
					    '<div class="thumbnail">' +
								'<h3>{{day}}</h3><span class="date">{{date}}</span>' +
		   				 	'<img src="http://openweathermap.org/img/w/{{icon}}.png" alt="wahther">' +
					    	'<p class="min-max-tempeture">' +
					    		'<span class="min-tempeture">{{min-tempeture}}&deg;</span>/ ' +
					    		'<span class="max-tempeture">{{max-tempeture}}&deg;</span></p>' +
					    '</div>' +
					'</div>';


var arrDaysOfWeek = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getWeather(city){

	var apiKey = "51dfe17d07bd5837099b63dd901d04e4";

	var link ="http://api.openweathermap.org/data/2.5/forecast/daily?q="+ city +"&cnt=5&mode=json&APPID=" + apiKey;
	$.ajax({
		url:link,
		method:"GET",
		dataType : "json",
		cache : false
	}).done(function (jData) {

		var cityName = jData.city.name,
				listOfDays = jData.list,
				listLength = listOfDays.length;

		for(var i = 0; i < listLength; i++){

			var objForecast = listOfDays[i];

			var forecastDate = Number(objForecast.dt + "000");
			forecastDate =  new Date(forecastDate);
			 
			var dayOfWeek = forecastDate.getDay();
			dayOfWeek = arrDaysOfWeek[dayOfWeek];

			var dayOfMonth = forecastDate.getDate();

			var month = forecastDate.getMonth();
			month = month + 1;
			if(month < 10){
				month = "0" + month + "";
			}

			var year = forecastDate.getFullYear();
			year = year.toString();
			year = year[2] + year[3];

			var fullDate = dayOfMonth + "." + month + "." + year;

			var minTempeture = objForecast.temp.min;
			minTempeture = minTempeture - 272.15; 
			minTempeture = minTempeture.toFixed(0);

			var maxTempeture = objForecast.temp.max;
			maxTempeture = maxTempeture - 272.15; 
			maxTempeture = maxTempeture.toFixed(0);

			var icon = objForecast.weather[0].icon;

			var dayWeatherLayout = dayTemplate.replace("{{day}}", dayOfWeek);
			dayWeatherLayout = dayWeatherLayout.replace("{{date}}", fullDate);
			dayWeatherLayout = dayWeatherLayout.replace("{{icon}}", icon);
			dayWeatherLayout = dayWeatherLayout.replace("{{min-tempeture}}", minTempeture);
			dayWeatherLayout = dayWeatherLayout.replace("{{max-tempeture}}", maxTempeture);

			$(".row").append(dayWeatherLayout);
		}

		$("#city-name").text(cityName);
		$(".weather-forecast").fadeIn(300);
		requestsNumber = 0;

	});
}

var requestsNumber = 0;
function prepareWeather(){
	var city = $(inpCityName).val();
	if(city !== ""){
		$(".weather-forecast").fadeOut(300, function(){
			$(".row").empty();
			if( requestsNumber === 0){
				getWeather(city);
				requestsNumber ++;
			}
		});
	}
}


$("#btnGetWeather").click(function(){
	prepareWeather();
});

$(document).keypress(function(event){
	if(event.keyCode == 13){
		prepareWeather();
	}
});
