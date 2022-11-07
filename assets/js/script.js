// global variable declaration start here
const form = document.querySelector(".my-form"),
  wrapper = document.querySelector(".wrapper"),
  searchDiv = document.querySelector(".search"),
  input = document.querySelector(".input-content"),
  inputContent = document.querySelector(".input-content"),
  btn = document.querySelector(".btn"),
  heading = document.querySelector(".heading"),
  error = document.querySelector(".error"),
  apiKey = `bdea81d390362a49874c43a13fcf6056`;
let removeappend;
// global variable declaration end here

// form event start here
form.addEventListener("click", (e) => {
  e.preventDefault();
  const inputVal = input.value;
  if (inputVal === "") {
    error.innerText = "*please enter a city name";
    error.classList.add("fail");
    inputContent.classList.add("fail");
  } else {
    error.innerText = "getting wheathering details";
    error.classList.remove("fail");
    inputContent.classList.remove("fail");
    error.classList.add("success");
    inputContent.classList.add("success");
    setTimeout(function () {
      wrapper.classList.add("active")
      getWheather(inputVal);
    }, 500);
  }
});

// API fetch start here
function getWheather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // retuning data to show
      return showWheather(data);
    });
};
// API fetch end here
// function for showing wheather data start here
function showWheather(data) {
  const dataShow = document.createElement("div");
  dataShow.className = "show-weather",
    dataShow.innerHTML = `<h2 class="wheather-heading">wheather in ${data.name} </h2>
  <h3 class="temp">${Math.floor(data.main.temp)} °C</h3> <div class="icon-content">
  <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="wheather Icon" class="icon">
  <span class="description">${data.weather[0].main}</span></div>
  <span class="humidity">humidity: ${data.main.humidity}%</span>
  <span class="wind-speed">wind speed: ${data.wind.speed} km/hour</span>`;
  searchDiv.appendChild(dataShow);
}
// function for showing wheather data end here
// event for home page start here
heading.addEventListener("click", () => {
  wrapper.classList.remove("active");
})
// event for home page end here
// event for Geolocation start here
btn.addEventListener("click", () => {
  if (navigator.geolocation) {
    // if browser support geolocation API
    navigator.geolocation.getCurrentPosition(showSuccces, showError);
    showGeo();
    wrapper.classList.add(active);
  } else {
    alert("sorry your browser dosent support geolocation API")
  }
});
function showError() {
  alert("user declined geolocation")
}
function showSuccces(position) {
  // getting latitude and longitude data from user device
  const { latitude, longitude } = position.coords;
  let geoapi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
  fetchGeoapi(geoapi);
  // showWheather(position);
}

function fetchGeoapi(geoapi) {
  fetch(geoapi)
    .then(function (response) {
      return response.json();
    })
    .then(function (info) {
      // retuning info to show
       showGeo(info);
    });
}
function showGeo(info) {
  const dataShow = document.createElement("div");
  dataShow.className = "show-weather",
  // console.log(info);
  dataShow.innerHTML = `<h2 class="wheather-heading">wheather in ${info.name} </h2>
  <h3 class="temp">${Math.floor(info.main.temp)} °C</h3> <div class="icon-content">
  <img src="https://openweathermap.org/img/wn/${info.weather[0].icon}.png" alt="wheather Icon" class="icon">
  <span class="description">${info.weather[0].main}</span></div>
  <span class="humidity">humidity: ${info.main.humidity}%</span>
  <span class="wind-speed">wind speed: ${info.wind.speed} km/hour</span>`;
  searchDiv.appendChild(dataShow);
}


// // console.log(result);









