const weather = document.querySelector(".js-weather");

const API_KEY = "fcbf005afd7919f53bbf1d48d66f1888";
const COORDS = "coords";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    //appid에서 API KEY를 넣어줘야 하는 이유: 한 사람이 과도하게 request 하는 걸 monitor/stop 하기 위해서 API 제공하는 측이 설정해놓은 것.
  )
    .then(function (firstComesResponse) {
      //".then" 을 쓰면 앞의 명령어가 완전히 종료된 후에 그 다음 동작 실행하게 함.
      return firstComesResponse.json(); //json() 함수로 reponse 상태정보가 아닌 호출된 결과 자체를 가져오기
    })
    .then(function (andThenTheJSON) {
      //json() 동작이 완전히 종료되도록 기다리기 ==> json() 의 반환값을 args 로 활용
      const temp = andThenTheJSON.main.temp;
      const word = andThenTheJSON.weather[0].main;
      const place = andThenTheJSON.name;
      weather.innerText = `${word} | ${temp}ºC | @${place}`;
    });
}
// JS can send a request and get data in the websites, without refreshing the website.
// (eg. email comes in without refresing the browser)
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude, //same as "longitude: longitude" (key, value를 같은 이름으로 할 때 단축 syntax)
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError(error) {
  console.log(`Error: ${error.code}, ${error.message}`);
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const coords = localStorage.getItem(COORDS);
  if (coords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(coords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
