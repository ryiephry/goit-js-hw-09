import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const inputEl = document.querySelector("input[type=text]");
const span = document.getElementsByTagName("span")
const startBtn = document.querySelector("button")
let totalMileSeconds = "";
let leftOverMile = "" 
let live = ""
const da = new Date()
let interval = "";


//if date is before current date button.disabled
//if date is before current date window.alert("please choose a later date in the future")
//start button is inactive until date is later then current date
//need a function that takes the future date and counts down from x amount of time until current date  /padstart
//the onClose()
//console.log(da.getTime()) // number of milesec since beggining of Time 
// the future mileseconds minus current dates mileseconds , remaining is mileseconds needed to count down from 
startBtn.addEventListener("click", minusMileSeconds)

function minusMileSeconds() {  
  
  if (leftOverMile > 1000) {
      
     if (leftOverMile > 1000) {
    live = convertMs(leftOverMile);
    console.log(live)
    span[0].textContent = live["days"]
    span[2].textContent = live["hours"]
    span[4].textContent = live["minutes"]
    span[6].textContent = live["seconds"]
       

    function minus() {
       leftOverMile - 1000;
       console.log(leftOverMile)
    }
   interval = setInterval(minus, 3000)
    }
    
  }
   else{
       alert("choose a later date")
       console.log("start button is disabled")
       //startBtn.disabled = true;
       clearInterval(interval)
  }
  
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    totalMileSeconds = selectedDates[0].getTime();
    leftOverMile = totalMileSeconds - da.getTime();
    startBtn.disabled = true
    if (leftOverMile > 1000) {
      startBtn.disabled = false;
    }
  }
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
flatpickr(inputEl, options)

