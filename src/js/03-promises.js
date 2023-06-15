const fromEl       = document.querySelector("form");
const firstDelayEl = document.querySelector("input[name='delay']");
const delayStepEl  = document.querySelector("input[name='step']");
const amountEl     = document.querySelector("input[name='amount']");
const createBtn    = document.querySelector("button[type='submit']");
let liveStepValue  = []//delayStepEl.value + amountEl.value;
let number = ""
//console.log(liveStepValue)


function handleSubmit(e) {
  e.preventDefault();

  // goal is to on submit capture the input fields in to variables 
  // then put those variables in to a function that relies on x amount of arguments
  // console.log(firstDelayEl.value)
  // creating a for loop that repeats promise 

  for (let i = 0; i < amountEl.value; i++){ // up until amount n
    //console.log(i);
    createPromise(i, firstDelayEl.value)
      .then(({ position, delay }) => {
       // console.log(`The current position is ${position} and the current value is ${delay}`)
      })
   
      }
}

// gets the 



function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    //currentDelayStep()


    //console.log(delay)
      
    for (let i = 0; i < amountEl.value; i++) {
      number = i * delayStepEl.value
      liveStepValue.push(number + parseFloat(firstDelayEl.value))
      // console.log(liveStepValue)
    }
      setTimeout(() => {

        if (shouldResolve) {
          resolve({ position, delay }); // passing in data to send to user 
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`)
      
        } else {
          reject({ position, delay });
          console.log(`❌ Rejected promise ${position} in ${delay}ms`)
        }
      
          
      }, liveStepValue
    
      )
  })
}  

fromEl.addEventListener("submit", handleSubmit)