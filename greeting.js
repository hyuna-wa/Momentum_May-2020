// localStorage works based on the URL

const form = document.querySelector(".js-input"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greeting");

const CURRENTUSER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(CURRENTUSER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    // 특정 event의 default action (페이지 새로고침)을 막음
    const currentValue = input.value; 
    // input 박스에 적힌 값을 가져옴
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(CURRENTUSER_LS);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();