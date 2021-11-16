import {marker, address} from '../map.js';
import {formWindow, formReset} from '../form.js';

const success = document.querySelector('#success').content.querySelector('.success');
const error = document.querySelector('#error').content.querySelector('.error');

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
  }, {once: true});

  formWindow.addEventListener('keydown', (successEvt) => {
    if (successEvt.key === 'Escape') {
      successClone.remove();
    }
  }, {once: true});
};

const onError = () => {
  const errorClone = error.cloneNode(true);
  document.body.append(errorClone);

  errorClone.addEventListener('click', () => {
    errorClone.remove();
  }, {once: true});

  formWindow.addEventListener('keydown', (errorEvt) => {
    if (errorEvt.key === 'Escape') {
      errorClone.remove();
    }
  }, {once: true});
};

export {onSuccess, onError};
