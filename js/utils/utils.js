import {marker} from '../map.js';
import {formReset} from '../form.js';

const successElement = document.querySelector('#success').content.querySelector('.success');
const errorElement = document.querySelector('#error').content.querySelector('.error');

const onSuccess = () => {
  formReset();
  marker.setLatLng(
    {
      lat: 35.68405,
      lng: 139.75312,
    });

  const successClone = successElement.cloneNode(true);

  function removeElement () {
    successClone.remove();
    document.removeEventListener('keydown', removeSuccessKeydown);
  }

  function removeSuccessClick () {
    removeElement();
  }

  function removeSuccessKeydown  (successEvt) {
    if (successEvt.key === 'Escape') {
      removeElement();
    }
    removeSuccessClick();
  }

  successClone.addEventListener('click', removeSuccessClick);
  document.addEventListener('keydown', removeSuccessKeydown);
  document.body.append(successClone);
};

const onError = () => {
  const errorClone = errorElement.cloneNode(true);

  function removeElement () {
    errorClone.remove();
    document.removeEventListener('keydown', removeErrorKeydown);
  }

  function removeErrorClick () {
    removeElement();
  }

  function removeErrorKeydown (successEvt) {
    if (successEvt.key === 'Escape') {
      removeErrorClick();
    }
  }

  errorClone.addEventListener('click', removeErrorClick);
  document.addEventListener('keydown', removeErrorKeydown);
  document.body.append(errorClone);
};


export {onSuccess, onError};
