const startBtn = document.getElementsByTagName("button")[0];
const stopBtn = document.getElementsByTagName("button") [1];
const body = document.body;

startBtn.addEventListener("click", colorChangingF);

function colorChangingF() {
    setInterval(everySecond, 1000);
}
function everySecond() {
            return body.style.backgroundColor = getRandomHexColor()
} 
    
stopBtn.addEventListener("click", stopColorChange);

function stopColorChange() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
}



console.log("hi")












function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}