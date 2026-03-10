// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];

        if (!userSelectedDate || userSelectedDate <= Date.now()) {
            startBtn.disabled = true;

            iziToast.error({
                position: "topRight",
                message: "Please choose a date in the future",
            });

            return;
        }

        startBtn.disabled = false;
    }
};

const startBtn = document.querySelector('[data-start]');

flatpickr("#datetime-picker", options);


const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startBtn.disabled = true;

startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    document.querySelector('#datetime-picker').disabled = true;
    const timerId = setInterval(() => {
        const currentTime = new Date();
        const timeDifference = userSelectedDate - currentTime;
        if (timeDifference <= 0) {
            clearInterval(timerId);
            document.querySelector('#datetime-picker').disabled = false;
            return;
        }
        const timeComponents = convertMs(timeDifference);
        daysEl.textContent = addLeadingZero(timeComponents.days);
        hoursEl.textContent = addLeadingZero(timeComponents.hours);
        minutesEl.textContent = addLeadingZero(timeComponents.minutes);
        secondsEl.textContent = addLeadingZero(timeComponents.seconds);
    }, 1000);
});

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
 };


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

