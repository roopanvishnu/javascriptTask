// let display = document.getElementById("display");
// let currentInput = "";
let display = document.getElementById("display");
let currentInput = "";
// function appendToDisplay(value) {
//     if (display.innerText === "0" && value !== ".") {
//         currentInput = value;
//     } else {
//         currentInput += value;
//     }
//     display.innerText = currentInput;
// }
function appendToDisplay(value){
    if(display.innerText === '0' && value !=='.'){
        currentInput = value;
    }else{
        currentInput +=value;
    }
    display.innerText = currentInput;
}
// function clearDisplay() {
//     currentInput = "";
//     display.innerText = "0";
// }
function clearDisplay(){
    currentInput = "";
    display.innerText = "0";
}
// function deleteLast() {
//     currentInput = currentInput.slice(0, -1);
//     display.innerText = currentInput || "0";
// }
function deleteLast(){
    currentInput = currentInput.slice(0,-1);
    display.innerText = currentInput || "0";
}
// function calculateResult() {
//     try {
//         currentInput = eval(currentInput).toString();
//         display.innerText = currentInput;
//     } catch (error) {
//         display.innerText = "Error";
//         currentInput = "";
//     }
// }
function calculateResult(){
    try{
        currentInput = eval(currentInput).toString();
        display.innerText = currentInput;
    }catch (error){
        display.innerText ="";
        currentInput = "";
    }
}
