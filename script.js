const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");
// querySelector finds the children of the selected object

function getTime() {
    const date = new Date();
    // in the above, "Date" is a class ==> check out the full stack JS course. It's an object
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${
        hours < 10 ? `0${hours}` : hours
        }:${
        minutes < 10 ? `0${minutes}` : minutes
        }:${
        seconds < 10 ? `0${seconds}` : seconds
        }`;
    // mini if  (`${}`, ?, : 활용)

}
 

function init(){
    getTime();
    setInterval(getTime, 1000);
}

init();