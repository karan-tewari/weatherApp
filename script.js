if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosSuccess, getPosErr);
} else {
    alert('geolocation not available?! What year is this?');
}
function getPosSuccess(pos) {
  var geoLat = pos.coords.latitude.toFixed(5);
  var geoLng = pos.coords.longitude.toFixed(5);
  var geoAcc = pos.coords.accuracy.toFixed(1);

  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(xhttp.responseText);
            console.log(data);
            document.getElementById('gotCityName').innerText = data.name;
            document.getElementsByClassName('currentTemp')[0].innerText= data.main.temp;
            let fetchIcon = data.weather[0].icon;
            let weatherIcon = `http://openweathermap.org/img/w/${fetchIcon}.png`;
            if(weatherIcon){
                document.getElementsByClassName('weatherIconContainer')[0].style.display = "block";
                let img = document.getElementById('weatherImg');
                img.src=weatherIcon;
                let fetchIconDetails = data.weather[0].description;
                img.title=fetchIconDetails;
            }
            let tempDesc = document.getElementsByClassName('tempType')[0];
            tempDesc.innerText = data.weather[0].description;

            let myTemp = data.weather[0].description;

            if(myTemp === "smoke"){
                document.body.className = "smoky";
            }
            else if(myTemp === "haze"){
                document.body.className = "hazy";
            }
            else if(myTemp === "rain"){
                document.body.className = "rainy";
            }
            else if(myTemp === "sunny"){
                document.body.className = "sunny";
            }
            else{
                document.body.className = "clearWeather";
            }
        }
    };
    xhttp.open("GET", `https://weathersync.herokuapp.com/weather/${geoLat},${geoLng}`);
    xhttp.send();
}

function getPosErr(err) {
    switch (err.code) {
      case err.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case err.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case err.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      default:
        alert("An unknown error occurred.");
    }
  }