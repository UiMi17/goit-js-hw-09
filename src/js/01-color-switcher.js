function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const clickMeBtn = document.querySelector('[data-click]')
const body = document.querySelector('body');

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  const bodyColorInterval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  stopBtn.addEventListener('click', () => {
    startBtn.disabled = false;
    stopBtn.disabled = true;

    clearInterval(bodyColorInterval);
  });
});

clickMeBtn.addEventListener('click', () => {
  alert("Don't you dare fucking click me again. Stop right now")
})