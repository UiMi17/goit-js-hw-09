// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const spanCounters = document.querySelectorAll('.value');

const daysCounter = document.querySelector('[data-days]');
const hoursCounter = document.querySelector('[data-hours]');
const minutesCounter = document.querySelector('[data-minutes]');
const secondsCounter = document.querySelector('[data-seconds]');

let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      startBtn.disabled = true;
      Notiflix.Report.failure(
        'Error!',
        'Please, choose a date in the future.',
        'Close message'
      );
    } else {
      startBtn.disabled = false;
      selectedDate = selectedDates[0];
    }
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', () => {
  const counterInterval = setInterval(() => {
    daysCounter.textContent = addLeadingZero(
      convertMs(selectedDate - new Date()).days
    );
    hoursCounter.textContent = addLeadingZero(
      convertMs(selectedDate - new Date()).hours
    );
    minutesCounter.textContent = addLeadingZero(
      convertMs(selectedDate - new Date()).minutes
    );
    secondsCounter.textContent = addLeadingZero(
      convertMs(selectedDate - new Date()).seconds
    );

    const isDone = [...spanCounters].every(counter => {
      return counter.textContent === '00';
    });
    if (isDone === true) {
      clearInterval(counterInterval);
    }
  }, 1000);
});

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

function addLeadingZero(value) {
  if (String(value).indexOf('0') !== 0) {
    return String(value).padStart(2, '0');
  }
  return '00';
}
