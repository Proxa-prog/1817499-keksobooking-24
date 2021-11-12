import {marker, address} from '../map.js';
import {formWindow, formReset} from '../form.js';

const ALERT_SHOW_TIME = 5000;
const success = document.querySelector('#success').content.querySelector('.success');
const error = document.querySelector('#error').content.querySelector('.error');

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '25%';
  alertContainer.style.top = '50%';
  alertContainer.style.width = '50%';
  alertContainer.style.height = 50;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const onSuccess = () => {
  formReset();
  marker.setLatLng(
    {
      lat: 35.68405,
      lng: 139.75312,
    });

  address.value = '35.68405 139.75312';

  const successClone = success.cloneNode(true);
  document.body.append(successClone);

  successClone.addEventListener('click', () => {
    successClone.remove();
  });

  formWindow.addEventListener('keydown', (successEvt) => {
    if (successEvt.key === 'Escape') {
      successClone.remove();
    }
  });
};

const onError = () => {
  const errorClone = error.cloneNode(true);
  document.body.append(errorClone);

  errorClone.addEventListener('click', () => {
    errorClone.remove();
  });

  formWindow.addEventListener('keydown', (errorEvt) => {
    if (errorEvt.key === 'Escape') {
      errorClone.remove();
    }
  });
};

export {showAlert, onSuccess, onError};
