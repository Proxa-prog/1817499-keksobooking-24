import {onSuccess, onError} from './utils/utils.js';
import {sendData} from './api.js';
import {markerGet, addressElement, mapReset} from './map.js';

const ZERO_VALUE_STRING = '0';
const HUNDRED_ROOMS = '100';
const BUNGALOW = 'bungalow';
const FLAT = 'flat';
const HOTEL = 'hotel';
const HOUSE = 'house';
const PALACE = 'palace';
const THOUSAND_STRING = '1000';
const THREE_THOUSAND_STRING = '3000';
const FIVE_THOUSAND_STRING = '5000';
const ONE_HUNDRED_THOUSAND_STRING = '100000';
const TWELVE_HOURS = '12:00';
const THITTEEN_HOUSR = '13:00';
const FOURTEEN_HOURS = '14:00';
const formWindowElement = document.querySelector('.ad-form');
const mapFiltersWindowElement = document.querySelector('.map__filters');
const fieldsetsElement = formWindowElement.querySelectorAll('fieldset');
const selectElements = mapFiltersWindowElement.querySelectorAll('select');
const mapFiltersFieldsetElement = mapFiltersWindowElement.querySelector('fieldset');
const howManyRoomsElement = formWindowElement.querySelector('#room_number');
const capacityElement =  formWindowElement.querySelector('#capacity');
const howManyGuestsElement = capacityElement.querySelectorAll('option');
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

  for(let i = 0; i < selectElements.length; i++) {
    selectElements[i].disabled = false;
  }

  mapFiltersFieldsetElement.disabled = false;
};

const startFormDeactivation = () => {
  formWindowElement.classList.add('ad-form--disabled');
  mapFiltersWindowElement.classList.add('map__filters--disabled');

  for(let i = 0; i < fieldsetsElement.length; i++) {
    fieldsetsElement[i].disabled = true;
  }

  for(let i = 0; i < selectElements.length; i++) {
    selectElements[i].disabled = true;
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

const runGetRatioOfGuests = () => {
  capacityElement.value = howManyRoomsElement.value;
  for(let i = 0; i < howManyGuestsElement.length; i++) {
    if(capacityElement.value === howManyGuestsElement[i].value || howManyGuestsElement[i].value < capacityElement.value && howManyGuestsElement[i].value !== ZERO_VALUE_STRING) {
      howManyGuestsElement[i].disabled = false;
    } else {
      howManyGuestsElement[i].disabled = true;
    }
  }
};

runGetRatioOfGuests();

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
  runGetRatioOfGuests();
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
