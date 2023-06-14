import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const calendar = document.querySelector('#datetime-picker'); // Datepicker input element
const startBtn = document.querySelector('button[data-start]'); // Start button
const timer = document.querySelector('.timer'); // Timer element
const daysEl = document.querySelector('span[data-days]'); // Days element in the timer
const hoursEl = document.querySelector('span[data-hours]'); // Hours element in the timer
const minutesEl = document.querySelector('span[data-minutes]'); // Minutes element in the timer
const secondsEl = document.querySelector('span[data-seconds]'); // Seconds element in the timer

let userDate = null;   // User-selected date
let isActive = false;  // Timer active flag
let timerId = null;    // Timer interval ID

function pad(value) {
  return String(value).padStart(2, '0'); // makes the numbers for each day,hour,minute,second if less the 2 , add a "o" before the number so if days was 2 it would be 02
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function startCountDown() {
  calendar.disabled = true;
  startBtn.disabled = true;

  if (isActive) {
    return;
  }

  isActive = true;
  timerId = setInterval(() => {
    const currentTime = Date.now();             // Date.now() = the var currentTime
    const difference = userDate - currentTime;  // userDate/(number of milliseconds from UTC until future date)/ - currentTime/(current amount of milliseconds from UTC until now)
    const components = convertMs(difference);   // difference/(the leftover amount of milliseconds) = the difference in time from now till the future 
    
    daysEl.textContent = components.days;
    hoursEl.textContent = components.hours;
    minutesEl.textContent = components.minutes;
    secondsEl.textContent = components.seconds;

    if (difference <= 0) {                // the difference is negative meaning its before the currentTime
      clearInterval(timerId);             // clear the time 
      timer.innerHTML = 'Time is over!';  
    }
  }, 1000);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // 
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) { 
      // the selectedDates[0] is = UTC milliseconds , Date.now() =  UTC till currentTime
      
      alert('Please choose a date in the future');
      userDate = new Date();
    } else {
      // if selectedDates > Date.now()  /  its in the future
      startBtn.disabled = false;
      userDate = selectedDates[0];
    }
  },
};

flatpickr(calendar, options); // Initialize the datepicker immediately calls options() which is why startbtn isnt disabled , the else statement by onClose()
startBtn.addEventListener('click', startCountDown); // Start countdown event listener 