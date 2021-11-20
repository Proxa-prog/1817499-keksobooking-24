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

  const isEscapeKey = (evt) => {
    if (evt.key === 'Escape') {
      removeElement();
    }
  };

  const removeSuccessClick = () => {
    removeElement();
  }

  const removeSuccessKeydown = (successEvt) => {
    isEscapeKey(successEvt);
  }

  const removeElement = () => {
    successClone.remove();
    document.removeEventListener('keydown', removeSuccessKeydown);
  }

  successClone.addEventListener('click', removeSuccessClick);

  document.addEventListener('keydown', removeSuccessKeydown);
  document.body.append(successClone);
};

const onError = () => {
  const errorClone = errorElement.cloneNode(true);

  function removeErrorClick () {
    removeElement();
  }

  function removeErrorKeydown (successEvt) {
    if (successEvt.key === 'Escape') {
      removeErrorClick();
    }
  }

  function removeElement () {
    errorClone.remove();
    document.removeEventListener('keydown', removeErrorKeydown);
  }

  errorClone.addEventListener('click', removeErrorClick);
  document.addEventListener('keydown', removeErrorKeydown);
  document.body.append(errorClone);
};


export {onSuccess, onError};
