import {marker} from '../map.js';
import {formWindow, formReset} from '../form.js';

const success = document.querySelector('#success').content.querySelector('.success');
const error = document.querySelector('#error').content.querySelector('.error');
const successClone = success.cloneNode(true);
const errorClone = error.cloneNode(true);

function removeSuccessClick () {
  successClone.remove();
  successClone.removeEventListener('click', removeSuccessClick);
}

function removeSuccessKeydown (successEvt) {
  if (successEvt.key === 'Escape') {
    successClone.remove();
  }
  formWindow.removeEventListener('keydown', removeSuccessKeydown);
}

function removeOnErrorsClick () {
  errorClone.remove();
  errorClone.removeEventListener('click', removeOnErrorsClick);
}

function removeOnErrorKeydown (errorEvt) {
  if (errorEvt.key === 'Escape') {
    errorClone.remove();
  }
  formWindow.removeEventListener('keydown', removeOnErrorKeydown);
}

const onSuccess = () => {
  formReset();
  marker.setLatLng(
    {
      lat: 35.68405,
      lng: 139.75312,
    });


  document.body.append(successClone);

  successClone.addEventListener('click', removeSuccessClick);

  formWindow.addEventListener('keydown', removeSuccessKeydown);
};

const onError = () => {
  document.body.append(errorClone);

  errorClone.addEventListener('click', removeOnErrorsClick);
  formWindow.addEventListener('keydown', removeOnErrorKeydown);
};

export {onSuccess, onError};
