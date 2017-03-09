function initGeolocation () {
  if (navigator.geolocation) navigator.geolocation.getCurrentPosition(success, fail);
  else alert("Sorry, your browser does not support geolocation services.");
}

function success(position) {
  	longi = position.coords.longitude;
  	lat = position.coords.latitude;

  	console.log(longi);
  	console.log(lat);


	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+longi+"&units=metric&APPID=2e06fef261a0556f779380833d36ccd6", false);
	xhr.send();
	// &units=imperial - F

	var response = JSON.parse(xhr.response);
	console.log(response);

	dis = response.name.toUpperCase() + ", " + response.sys.country.toUpperCase();
	desc = response.weather[0].description;
	temp = response.main.temp;
	unit = "C";
	temp_f = temp * 9/5 + 32;
	wind = "wind speed: " + response.wind.speed;

	function getWeather(id,res) {
	  document.getElementById(id).innerHTML=res;
	}

	getWeather("dis", dis);
	getWeather("desc", desc);
	getWeather("temp", temp);
	getWeather("units", unit);
	getWeather("wind", wind);

	if (temp<=0) document.getElementById("main").style.background = "url(img/snowy.jpg) no-repeat center center";
	else if (temp>0 && temp<=10) document.getElementById("main").style.background = "url(img/rainy.jpg) no-repeat center center";
	else if (temp>10 && temp<=20) document.getElementById("main").style.background = "url(img/normal.jpg) no-repeat center center";
	else document.getElementById("main").style.background = "url(img/sunny.jpg) no-repeat center center";
}

function fail() {
	alert("Something is not working!");
}

function changeUnits() {
	if (unit==="C") {
	document.getElementById("units").innerHTML="F";
	document.getElementById("temp").innerHTML=temp_f;
	unit="F";
	} else {
	document.getElementById("units").innerHTML="C";
	document.getElementById("temp").innerHTML=temp;
	unit="C";
	}
}

function searchCity() {
	var cityName = document.getElementById("searchBar").value;

	var xhr2 = new XMLHttpRequest();
	xhr2.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q={' + cityName + '}&units=metric&APPID=2e06fef261a0556f779380833d36ccd6', false);
	xhr2.send();

	var response2 = JSON.parse(xhr2.response);
	console.log(response2);

	dis2 = response2.name.toUpperCase() + ", " + response2.sys.country.toUpperCase();
	desc2 = response2.weather[0].description;
	temp2 = response2.main.temp;
	unit2 = "C";
	temp_f2 = temp2 * 9/5 + 32;
	wind2 = "wind speed: " + response2.wind.speed;

	function getWeather2(id,res) {
	  document.getElementById(id).innerHTML=res;
	}

	getWeather2("dis", dis2);
	getWeather2("desc", desc2);
	getWeather2("temp", temp2);
	getWeather2("units", unit2);
	getWeather2("wind", wind2);

	if (temp<=0) document.getElementById("main").style.background = "url(img/snowy.jpg) no-repeat center center";
	else if (temp>0 && temp<=10) document.getElementById("main").style.background = "url(img/rainy.jpg) no-repeat center center";
	else if (temp>10 && temp<=20) document.getElementById("main").style.background = "url(img/normal.jpg) no-repeat center center";
	else document.getElementById("main").style.background = "url(img/sunny.jpg) no-repeat center center";

	document.getElementById("searchBar").value = null;
}



