const formWindow = document.querySelector('.ad-form');
const mapFiltersWindow = document.querySelector('.map__filters');
const formFieldset = formWindow.querySelectorAll('fieldset');
const mapFiltersSelect = mapFiltersWindow.querySelectorAll('select');
const mapFiltersFieldset = mapFiltersWindow.querySelector('fieldset');
const howManyRooms = formWindow.querySelector('#room_number');
const howManyGuests = formWindow.querySelector('#capacity').querySelectorAll('option');

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


const ratioOfGuests = (evt) => {
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
};

howManyRooms.addEventListener('change', ratioOfGuests);

export {formDeactivation, formActivation};
