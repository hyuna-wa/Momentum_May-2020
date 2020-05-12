const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector(".js-toDoInput"),
  list = document.querySelector(".js-ul");

const TODO_LS = "toDo";

let toDos = [];

function deleteToDo(event) {
  //added eventListner to delBtn when creating it
  //.target specifies the target of the event
  // console.dir(event.target) 으로 parent 정보를 가지고 있는 method 찾아냄
  const btn = event.target;
  const li = btn.parentNode;
  list.removeChild(li);
  // now that you've done the deleting html, now you need to update the local storage.
  const cleanToDos = toDos.filter(function (toDo) {
    // array.filter(function): array를 특정 function으로 "filter" (자주 쓰이므로 중요!!!)
    // filter runs a function through every item in the array and;
    // creates a new array only with the items that are true (from the function applied)
    // we want to go through the toDos array and get only ones that are NOT the one that is clicked to be deleted,
    // which can be defined by the the "li.id" (because const btn, li are defined by the eventListener)
    return toDo.id !== parseInt(li.id);
    // return 함수의 syntax
    // toDos(array)의 ojbects들(toDo)의 'id' value와 delBtn이 선택된 li의 id를 비교해서 값이 다른 아이들을 cleanToDos array에 넣는 것
    // parseInt(): string을 integer로 변환
  });
  toDos = cleanToDos; //toDos를 const 가 아닌 let 으로 변경
  saveToDo(toDos);
}

function saveToDo(text) {
  localStorage.setItem(TODO_LS, JSON.stringify(text));
}

function showToDo(text) {
  const delBtn = document.createElement("button");
  const item = document.createElement("li");
  const span = document.createElement("span");
  const itemId = toDos.length + 1;
  delBtn.innerText = "V";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = `${text}   `;
  item.id = itemId;
  item.appendChild(span);
  item.appendChild(delBtn);
  list.appendChild(item);
  const toDoObject = {
    id: itemId,
    text: text,
  };
  toDos.push(toDoObject);
  saveToDo(toDos);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  showToDo(currentValue);
  toDoInput.value = "";
}

function loadToDo() {
  const loadedToDo = localStorage.getItem(TODO_LS);
  if (loadedToDo !== null) {
    const parsedToDo = JSON.parse(loadedToDo); //parsedToDo is an array!!!!!!!
    parsedToDo.forEach(function (orange) {
      showToDo(orange.text);
      // 바깥에서 별도로 함수정의하지 않고 코드 내에서 간단 함수 정의
      // parsedToDo 라는 리스트 안의 밸류 하나인 orange에 '.text' 붙이는게 logically correct
      // (리스트 자체에 .text 붙이면 안 먹힘)
    });
  }
}

function init() {
  loadToDo();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();

//You can only save "strings" in localStorage. you cannot save arrays, booleans, etc. only "string" can be saved.
