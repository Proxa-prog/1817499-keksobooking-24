const formWindow = document.querySelector('.ad-form');
const mapFiltersWindow = document.querySelector('.map__filters');
const formFieldset = formWindow.querySelectorAll('*');
const mapFiltersChildren = mapFiltersWindow.querySelectorAll('*');

const formDeactivation = () => {
  formWindow.classList.add('ad-form--disabled');
  mapFiltersWindow.classList.add('map__filters--disabled');

  formFieldset.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  });

  mapFiltersChildren.forEach((mapChildren) => {
    mapChildren.setAttribute('disabled', 'disabled');
  });
};


const forActivation = () => {
  formWindow.classList.remove('ad-form--disabled');
  mapFiltersWindow.classList.remove('map__filters--disabled');

  formFieldset.forEach((fieldset) => {
    fieldset.removeAttribute('disabled', 'disabled');
  });

  mapFiltersChildren.forEach((mapChildren) => {
    mapChildren.removeAttribute('disabled', 'disabled');
  });
};

export {formDeactivation, forActivation};

