import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

const promiseGeneratorForm = document.querySelector('.form');

promiseGeneratorForm.addEventListener('submit', ev => {
  ev.preventDefault();

  const generatorFormAmount = Number(promiseGeneratorForm.amount.value);
  const generatorFormFirstStep = Number(promiseGeneratorForm.delay.value);
  const generatorFormStep = Number(promiseGeneratorForm.step.value);

  let currentStep = 0;

  for (let i = 0; i < generatorFormAmount; i++) {
    let delay = generatorFormFirstStep;

    if (i !== 0) {
      currentStep += generatorFormStep;
      delay += currentStep;
    }

    createPromise(i + 1, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          {
            timeout: 2500,
            cssClass: 'success',
          }
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`,
          {
            timeout: 2500,
            cssClass: 'failure',
          }
        );
      });
  }
  promiseGeneratorForm.reset();
});
