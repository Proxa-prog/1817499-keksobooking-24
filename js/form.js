const formWindow = document.querySelector('.ad-form');
const mapFiltersWindow = document.querySelector('.map__filters');
const formFieldset = formWindow.children;
const mapFiltersChildren = mapFiltersWindow.children;

const formDeactivation = () => {
  formWindow.classList.add('ad-form--disabled');
  mapFiltersWindow.classList.add('map__filters--disabled');

  for(let i = 0; i < formFieldset.length; i++) {
    formFieldset[i].disabled = 1;
  }

  for(let i = 0; i < mapFiltersChildren.length; i++) {
    mapFiltersChildren[i].disabled = 1;
  }
};


const formActivation = () => {
  formWindow.classList.remove('ad-form--disabled');
  mapFiltersWindow.classList.remove('map__filters--disabled');

  for(let i = 0; i < formFieldset.length; i++) {
    formFieldset[i].disabled = 0;
  }

  for(let i = 0; i < mapFiltersChildren.length; i++) {
    mapFiltersChildren[i].disabled = 0;
  }
};

export {formDeactivation, formActivation};

