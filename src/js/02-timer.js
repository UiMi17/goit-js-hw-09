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

startBtn.disabled = true

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      startBtn.disabled = true;
      playSound('http://soundbible.com/grab.php?id=1252&type=mp3');
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
  startBtn.disabled = true
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
      startBtn.disabled = true

      playSound(
        'https://drive.google.com/uc?id=1R3PAuwKo72qDEOHgj3CDL3S2TRKjj4nS&export=download'
      );
      Notiflix.Report.success(
        'Success!',
        'The timer has expired.',
        'Close message'
      );
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

function playSound(url) {
  const audio = new Audio(url);
  audio.play();
}
