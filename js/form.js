import {onSuccess, onError} from './utils/utils.js';
import {sendData} from './api.js';
import {markerGet, address, mapReset} from './map.js';

const formWindow = document.querySelector('.ad-form');
const mapFiltersWindow = document.querySelector('.map__filters');
const formFieldset = formWindow.querySelectorAll('fieldset');
const mapFiltersSelect = mapFiltersWindow.querySelectorAll('select');
const mapFiltersFieldset = mapFiltersWindow.querySelector('fieldset');
const howManyRooms = formWindow.querySelector('#room_number');
const howManyGuests = formWindow.querySelector('#capacity').querySelectorAll('option');
const typeOfHousing = formWindow.querySelector('#type');
const pricePerNight = formWindow.querySelector('#price');
const timeIn = formWindow.querySelector('#timein');
const timeOut = formWindow.querySelector('#timeout');
const reset = document.querySelector('.ad-form__reset');


const formActivation = () => {
  formWindow.classList.remove('ad-form--disabled');
  mapFiltersWindow.classList.remove('map__filters--disabled');

  for(let i = 0; i < formFieldset.length; i++) {
    formFieldset[i].disabled = false;
  }

  for(let i = 0; i < mapFiltersSelect.length; i++) {
    mapFiltersSelect[i].disabled = false;
  }

  mapFiltersFieldset.disabled = false;
};

const formDeactivation = () => {
  formWindow.classList.add('ad-form--disabled');
  mapFiltersWindow.classList.add('map__filters--disabled');

  for(let i = 0; i < formFieldset.length; i++) {
    formFieldset[i].disabled = true;
  }

  for(let i = 0; i < mapFiltersSelect.length; i++) {
    mapFiltersSelect[i].disabled = true;
  }

  mapFiltersFieldset.disabled = true;
};

formDeactivation();

const getRatioOfGuests = (evt) => {
  const currentValue = evt.target.value;
  for(let i = 0; i < howManyGuests.length; i++) {
    if(currentValue === howManyGuests[i].value || howManyGuests[i].value < currentValue && howManyGuests[i].value !== '0') {
      howManyGuests[i].disabled = false;
    } else {
      howManyGuests[i].disabled = true;
    }
  }

  if (currentValue === '100') {
    for(let j = 0; j < howManyGuests.length; j++) {
      howManyGuests[j].disabled = true;
      if (howManyGuests[j].value === '0') {
        howManyGuests[j].disabled = false;
      }
    }
  }
  howManyRooms.removeEventListener('change', getRatioOfGuests);
};

const showHousingCost = (evt) => {
  const currentHouseType = evt.target.value;

  switch(currentHouseType) {
    case 'bungalow':
      pricePerNight.placeholder = '0';
      pricePerNight.min = '0';
      break;
    case 'flat':
      pricePerNight.placeholder = '1000';
      pricePerNight.min = '1000';
      break;
    case 'hotel':
      pricePerNight.placeholder = '3000';
      pricePerNight.min = '3000';
      break;
    case 'house':
      pricePerNight.placeholder = '5000';
      pricePerNight.min = '5000';
      break;
    case 'palace':
      pricePerNight.placeholder = '100000';
      pricePerNight.min = '100000';
      break;
  }

  typeOfHousing.removeEventListener('change', showHousingCost);
};

const onCheckInAndCheckOutTime = (evt) => {
  const checkTime = evt.target.value;

  switch(checkTime) {
    case '12:00':
      timeIn.value = '12:00';
      timeOut.value = '12:00';
      break;
    case '13:00':
      timeIn.value = '13:00';
      timeOut.value = '13:00';
      break;
    case '14:00':
      timeIn.value = '14:00';
      timeOut.value = '14:00';
      break;
  }

  timeIn.removeEventListener('change', onCheckInAndCheckOutTime);
  timeOut.removeEventListener('change', onCheckInAndCheckOutTime);
};


const formReset = () => {
  formWindow.reset();
  mapFiltersWindow.reset();
  address.value = `${markerGet.lat} ${markerGet.lng}`;
};


const setUserFormSubmit = () => {
  formWindow.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      onSuccess,
      onError,
      new FormData(evt.target),
    );

    mapReset();
  });
};


reset.addEventListener('click', (evt) => {
  evt.preventDefault();

  formReset();
  mapReset();

  address.value = `${markerGet.lat} ${markerGet.lng}`;
});

howManyRooms.addEventListener('change', getRatioOfGuests);
typeOfHousing.addEventListener('change', showHousingCost);
timeIn.addEventListener('change', onCheckInAndCheckOutTime);
timeOut.addEventListener('change', onCheckInAndCheckOutTime);

export {formActivation, formWindow, setUserFormSubmit, formReset, mapFiltersWindow};
