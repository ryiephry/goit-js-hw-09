
import { throttle } from 'lodash';

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.body.style;

startBtn.addEventListener('click', throttle(onStartBtnClick, 1000));
stopBtn.addEventListener('click', onStopBtnClick);


let intervalId = null; 

function onStartBtnClick() {
 
  stopBtn.disabled = false;
  startBtn.disabled = true;

  // Start the interval to update the body color every 1000 milliseconds
  intervalId = setInterval(updateBodyColor, 1000);
}

// Function to handle the stop button click event
function onStopBtnClick() {
  // Clear the interval to stop updating the body color
  clearInterval(intervalId); // is able to clear the interval bec inter

  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function updateBodyColor() {
  bodyEl.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}
