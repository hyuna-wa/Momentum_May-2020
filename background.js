const body = document.querySelector("body");
//becuase you want to set the background in the entire 'body' element

const IMG_NUMBER = 5

function paintImage(number){
    const image = new Image(); ///'image' 라는 element를 생성
    //sames as: const image = document.createElement("img");
    image.src = `images/${number +1}.jpg`; /// WHAT IS THIS??
    image.classList.add("js-bgimage"); //give the class for CSS style setting
    body.appendChild(image);
}

// difference between appendChild vs. prepend?
// append: insert as the last index
// prepend: insert as the first index

function genRandom(){
    const number = Math.floor(Math.random() *IMG_NUMBER);
    return number;
}

// Math.random() * n 
//  => range(0, n) 까지의 숫자를 항상 float 형태로 generate
// Math.ceil()
// Math.floor()
// Math.floor(Math.random() * 7) 
//  => floor를 썼으므로 항상 7 미만 숫자로 나옴 (0~6)

function init(){
    const randomNumber = genRandom() ;
    paintImage(randomNumber);
}

init();
