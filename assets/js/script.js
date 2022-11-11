// global variable declaration start here
const form = document.querySelector(".my-form"),
  wheatherSection = document.querySelector(".wheather"),
  wrapper = document.querySelector(".wrapper"),
  input = document.querySelector(".input-content"),
  inputContent = document.querySelector(".input-content"),
  back = document.querySelector(".back"),
  error = document.querySelector(".error"),
  apiKey = `bdea81d390362a49874c43a13fcf6056`;
// global variable declaration end here

// input event start here
form.addEventListener("submit", (e) => {
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
        getWheather(inputVal);
    }
});
// event for form end here

// API fetch start here
// getWheather();
function getWheather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
  xmlhttp = new XMLHttpRequest;
  xmlhttp.onreadystatechange = function (){
    try{
      if(this.readyState == 4 && this.status == 200){
        data = JSON.parse(this.response);
        showWheather(data);
       
      }else if (this.status == 404){
         data =  JSON.parse(this.response);
        throw city +" "+data.message;
      }
    }catch(er){
      errorApper(er);
    }
  }
  xmlhttp.open('GET',url);
  xmlhttp.send();
}
// API fetch end here
// function for showing wheather data start here
const dataShow = document.createElement("div");
dataShow.className = "show-weather";

// function for append data for both API start here
function creatData(appendData) {
  dataShow.innerHTML = `<h2 class="wheather-heading">wheather in ${appendData.name.toLowerCase()} </h2>
<h3 class="temp">${Math.floor(appendData.main.temp)} °C</h3> <div class="icon-content">
<img src="https://openweathermap.org/img/wn/${appendData.weather[0].icon}.png" alt="wheather Icon" class="icon">
<span class="description">${appendData.weather[0].main}</span></div>
<span class="humidity">humidity: ${appendData.main.humidity}%</span>
<span class="wind-speed">wind speed: ${appendData.wind.speed} km/hour</span>`;
};
// function for append data for both API end here
function showWheather(data) {
  if (data) {
    if (data.name.toLowerCase()) {
      const removedataShow = document.querySelector(".show-weather");
      if (removedataShow) {
        removedataShow.parentElement.removeChild(removedataShow)
      }
      creatData(data);
      wrapper.appendChild(dataShow);
      wrapper.classList.add("active");
      inputContent.classList.add("success");
      // changing background according to temp 
      if (data.main.temp > 30) {
        wheatherSection.style.backgroundImage = 'url("https://www.vmcdn.ca/f/files/sudbury/uploadedImages/SUMMER_sunWater.jpg;w=960/1600x900/")';
      }
      if (data.main.temp <= 30) {
        wheatherSection.style.backgroundImage = 'url("https://images.unsplash.com/photo-1585088767603-ee684c611b0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80/1600x900/")';
      }
    }
  }
};

// function for showing error if response not found
function errorApper(er) {
  error.innerText = "*" + er;
  wrapper.classList.remove("active")
  error.classList.add("fail");
  inputContent.classList.add("fail");
};
// function for showing wheather data end here
// event for home page start here
back.addEventListener("click", () => {
  wheatherSection.style.backgroundImage = "";
  wrapper.classList.remove("active");
  dataShow.remove();
  error.classList.remove("success");
  inputContent.classList.remove("success");
})
// event for home page end here

// event for Geolocation start here
const btn = document.querySelector(".btn");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (navigator.geolocation) {
    // if browser support geolocation API
    navigator.geolocation.getCurrentPosition(showSuccces, showError);
  } else {
    alert("sorry your browser dosent support geolocation API")
  }
});
function showError() {
  alert("user declined geolocation")
}
// Geolocation API fetch start here
function showSuccces(position) {
  // getting latitude and longitude data from user device
  const { latitude, longitude } = position.coords;
  let geoapi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
  const geoxmlhttp = new XMLHttpRequest;
  geoxmlhttp.onreadystatechange = function (){
    try{
      if(this.readyState == 4 && this.status == 200){
        info = JSON.parse(this.response);
        showGeo(info);
      }else if (this.status==404){
         info =  JSON.parse(this.response);
        throw city +" "+data.message;
      }
    }catch(er){
      errorApper(er);
    }
  }
  geoxmlhttp.open('GET',geoapi);
  geoxmlhttp.send();
};
// Geolocation API fetch end here

// showing and append data of Geolocation start here
function showGeo(info) {
  removedataShow = document.querySelector(".show-weather");
  if (removedataShow) {
    removedataShow.parentElement.removeChild(removedataShow);
  }
  creatData(info);
  wrapper.classList.add('active');
  wrapper.appendChild(dataShow);
  error.classList.remove("fail");
  inputContent.classList.remove("fail");
  // changing background image according to temp
  if (info.main.temp > 30) {
    wheatherSection.style.backgroundImage = 'url("https://www.vmcdn.ca/f/files/sudbury/uploadedImages/SUMMER_sunWater.jpg;w=960/1600x900/")';
  }
  if (info.main.temp <= 30) {
    wheatherSection.style.backgroundImage = 'url("https://images.unsplash.com/photo-1585088767603-ee684c611b0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80/1600x900/")';
  }
};
// showing and append data of Geolocation end here