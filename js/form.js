import {onSuccess, onError} from './utils/utils.js';
import {sendData} from './api.js';
import {markerGet, addressElement, mapReset} from './map.js';
import {ZERO_VALUE_STRING, HUNDRED_ROOMS, BUNGALOW, FLAT, HOTEL, HOUSE, PALACE, THOUSAND_STRING, THREE_THOUSAND_STRING, FIVE_THOUSAND_STRING, ONE_HUNDRED_THOUSAND_STRING, TWELVE_HOURS, THITTEEN_HOUSR, FOURTEEN_HOURS} from './arrays-and-variables.js';

const formWindowElement = document.querySelector('.ad-form');
const mapFiltersWindowElement = document.querySelector('.map__filters');
const fieldsetsElement = formWindowElement.querySelectorAll('fieldset');
const selectsElement = mapFiltersWindowElement.querySelectorAll('select');
const mapFiltersFieldsetElement = mapFiltersWindowElement.querySelector('fieldset');
const howManyRoomsElement = formWindowElement.querySelector('#room_number');
const howManyGuestsElement = formWindowElement.querySelector('#capacity').querySelectorAll('option');
const typeOfHousingElement = formWindowElement.querySelector('#type');
const pricePerNightElement = formWindowElement.querySelector('#price');
const timeInElement = formWindowElement.querySelector('#timein');
const timeOutElement = formWindowElement.querySelector('#timeout');
const resetElement = document.querySelector('.ad-form__reset');


const startFormActivation = () => {
  formWindowElement.classList.remove('ad-form--disabled');
  mapFiltersWindowElement.classList.remove('map__filters--disabled');

  for(let i = 0; i < fieldsetsElement.length; i++) {
    fieldsetsElement[i].disabled = false;
  }

  for(let i = 0; i < selectsElement.length; i++) {
    selectsElement[i].disabled = false;
  }

  mapFiltersFieldsetElement.disabled = false;
};

const startFormDeactivation = () => {
  formWindowElement.classList.add('ad-form--disabled');
  mapFiltersWindowElement.classList.add('map__filters--disabled');

  for(let i = 0; i < fieldsetsElement.length; i++) {
    fieldsetsElement[i].disabled = true;
  }

  for(let i = 0; i < selectsElement.length; i++) {
    selectsElement[i].disabled = true;
  }

  mapFiltersFieldsetElement.disabled = true;
};

startFormDeactivation();

const getRatioOfGuestsChangeHandler = (evt) => {
  const currentValue = evt.target.value;
  for(let i = 0; i < howManyGuestsElement.length; i++) {
    if(currentValue === howManyGuestsElement[i].value || howManyGuestsElement[i].value < currentValue && howManyGuestsElement[i].value !== ZERO_VALUE_STRING) {
      howManyGuestsElement[i].disabled = false;
    } else {
      howManyGuestsElement[i].disabled = true;
    }
  }

  if (currentValue === HUNDRED_ROOMS) {
    for(let j = 0; j < howManyGuestsElement.length; j++) {
      howManyGuestsElement[j].disabled = true;
      if (howManyGuestsElement[j].value === ZERO_VALUE_STRING) {
        howManyGuestsElement[j].disabled = false;
      }
    }
  }
};

const showHousingCostChangeHandler = (evt) => {
  const currentHouseType = evt.target.value;

  switch(currentHouseType) {
    case BUNGALOW:
      pricePerNightElement.placeholder =ZERO_VALUE_STRING;
      pricePerNightElement.min = ZERO_VALUE_STRING;
      break;
    case FLAT:
      pricePerNightElement.placeholder = THOUSAND_STRING;
      pricePerNightElement.min = THOUSAND_STRING;
      break;
    case HOTEL:
      pricePerNightElement.placeholder = THREE_THOUSAND_STRING;
      pricePerNightElement.min = THREE_THOUSAND_STRING;
      break;
    case HOUSE:
      pricePerNightElement.placeholder = FIVE_THOUSAND_STRING;
      pricePerNightElement.min = FIVE_THOUSAND_STRING;
      break;
    case PALACE:
      pricePerNightElement.placeholder = ONE_HUNDRED_THOUSAND_STRING;
      pricePerNightElement.min = ONE_HUNDRED_THOUSAND_STRING;
      break;
  }
};

const CheckInAndCheckOutTimeChangeHandler = (evt) => {
  const checkTime = evt.target.value;

  switch(checkTime) {
    case TWELVE_HOURS:
      timeInElement.value = TWELVE_HOURS;
      timeOutElement.value = TWELVE_HOURS;
      break;
    case THITTEEN_HOUSR:
      timeInElement.value = THITTEEN_HOUSR;
      timeOutElement.value = THITTEEN_HOUSR;
      break;
    case FOURTEEN_HOURS:
      timeInElement.value = FOURTEEN_HOURS;
      timeOutElement.value = FOURTEEN_HOURS;
      break;
  }
};


const formReset = () => {
  formWindowElement.reset();
  mapFiltersWindowElement.reset();
  addressElement.value = `${markerGet.lat} ${markerGet.lng}`;
  pricePerNightElement.placeholder = THOUSAND_STRING;
  pricePerNightElement.min = THOUSAND_STRING;
};


const setUserFormSubmit = () => {
  formWindowElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      onSuccess,
      onError,
      new FormData(evt.target),
    );

    mapReset();
  });
};


resetElement.addEventListener('click', (evt) => {
  evt.preventDefault();

  formReset();
  mapReset();

  addressElement.value = `${markerGet.lat} ${markerGet.lng}`;
});

howManyRoomsElement.addEventListener('change', getRatioOfGuestsChangeHandler);
typeOfHousingElement.addEventListener('change', showHousingCostChangeHandler);
timeInElement.addEventListener('change', CheckInAndCheckOutTimeChangeHandler);
timeOutElement.addEventListener('change', CheckInAndCheckOutTimeChangeHandler);

export {startFormActivation, setUserFormSubmit, formReset, formWindowElement};
