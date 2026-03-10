// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
        iziToast.success({
            color: 'green',
          position: 'topRight',
        message: `✅ Fulfilled promise in ${delay}ms`
      });
    })
    .catch(delay => {
        iziToast.error({
            color: 'red',
          position: 'topRight',
        message: `❌ Rejected promise in ${delay}ms`
      });
    });

  form.reset();
});