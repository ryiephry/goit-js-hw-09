const formEl = document.querySelector('.form'); // Select the 'form'

formEl.addEventListener('submit', onFormSubmit); // Add event listener for form submission

// sets up the varibles delay / step / amount inside function then calls the promise and resets form
function onFormSubmit(evt) {
  evt.preventDefault(); // Prevent the default form submission behavior

  // Extract the input values from the form
  //parseInt just converts a number thats a string to a integer

  let delay = parseInt(evt.currentTarget.delay.value); // Get the 'delay' input value and convert it to an integer console.log(evt.currentTarget = the form element , but .delay is the attribute to the form / name="delay")
  let step = parseInt(evt.currentTarget.step.value); // Get the 'step' input value and convert it to an integer
  let amount = parseInt(evt.currentTarget.amount.value); // Get the 'amount' input value and convert it to an integer

  promise({ delay, step, amount }); // Call the promise function with the input values

  evt.target.reset(); // Reset the form fields
}
// creates the random possibility of it being passed or throwing an error / returns a new promise either way returning the position and the delay in a object
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3; // Randomly determine if the promise should resolve or reject

  // Create a new promise that resolves or rejects randomly based on shouldResolve
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay }); // Resolve the promise with an object containing position and delay
    } else {
      reject({ position, delay }); // Reject the promise with an object containing position and delay
    }
  });
}
// creates a for loop around the setTimeouts and call the createPromise inside then pass the promise value in to the .then if fullfilled console.log if not also console.log
function promise({ delay, step, amount }) {
  for (let position = 1; position <= amount; position += 1) {

    // <= only works if i = 1 or more
    // console.log(position) = the exact number interval out of amount we are at 
    // Create a promise for each position with the given delay
   
    createPromise(position, delay)
     
      .then(({ position, delay }) => {
        // Log a success message after the specified delay
        setTimeout(() => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);      
        }, delay);
      })

      .catch(({ position, delay }) => {
        // Log a failure message after the specified delay
        setTimeout(() => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay);
        // reason why theres a delay by both is because only one is happening at once so you need a delay for each case 
        // setTimeout is just a 1 time delay however since there is a for loop around the setTimeout , it  happens multiple times  
      });

    delay += step; // Increase the delay by the step value for the next promise 
  }
}