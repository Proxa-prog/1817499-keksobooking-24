const formWindow = document.querySelector('.ad-form');
const mapFiltersWindow = document.querySelector('.map__filters');
const formFieldset = formWindow.querySelectorAll('fieldset');
const mapFiltersChildren = mapFiltersWindow.children;
const howManyRooms = formWindow.querySelector('#room_number');
const howManyGuests = formWindow.querySelector('#capacity').querySelectorAll('option');



const formDeactivation = () => {
  formWindow.classList.add('ad-form--disabled');
  mapFiltersWindow.classList.add('map__filters--disabled');

  for(let i = 0; i < formFieldset.length; i++) {
    formFieldset[i].disabled = true;
  }

  for(let i = 0; i < mapFiltersChildren.length; i++) {
    mapFiltersChildren[i].disabled = true;
  }
};


const formActivation = () => {
  formWindow.classList.remove('ad-form--disabled');
  mapFiltersWindow.classList.remove('map__filters--disabled');

  for(let i = 0; i < formFieldset.length; i++) {
    formFieldset[i].disabled = false;
  }

  for(let i = 0; i < mapFiltersChildren.length; i++) {
    mapFiltersChildren[i].disabled = false;
  }
};


const ratioOfGuests = (evt) => {
  const currentValue = evt.target.value;
  for(let i = 0; i < howManyGuests.length; i++) {
    if(currentValue === howManyGuests[i].value || howManyGuests[i].value < currentValue) {
      howManyGuests[i].disabled = false;
    } else {
      howManyGuests[i].disabled = true;
    }
  }

  if (currentValue === '4') {
    for(let j = 0; j < howManyGuests.length; j++) {
      howManyGuests[j].disabled = true;
      if (currentValue === howManyGuests[j].value) {
        howManyGuests[j].disabled = false;
      }
    }
  }
}

howManyRooms.addEventListener('change', ratioOfGuests);

export {formDeactivation, formActivation};
