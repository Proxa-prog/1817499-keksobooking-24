import {renderAnnouncementList} from './map.js';
import {markerGroup} from './map.js';
import {debounce} from './utils/debounce.js';

const SIMILAR_ADD_COUNT = 10;
const housingType = document.querySelector('.map__filters').querySelector('#housing-type');
const housingPrice = document.querySelector('.map__filters').querySelector('#housing-price');
const housingRooms = document.querySelector('.map__filters').querySelector('#housing-rooms');
const housingGuests = document.querySelector('.map__filters').querySelector('#housing-guests');

const getHouseType = (currentAdd) => currentAdd.offer.type === housingType.value || housingType.value === 'any';

const getHousePrice = (currentAdd) => housingPrice.value === 'any'
  || currentAdd.offer.price < 10000 && housingPrice.value === 'low'
  || currentAdd.offer.price >= 10000 && currentAdd.offer.price < 50000 && housingPrice.value === 'middle'
  || currentAdd.offer.price > 50000 && housingPrice.value === 'high';

const getNumberOfRooms = (currentAdd) => currentAdd.offer.rooms === Number(housingRooms.value) || housingRooms.value === 'any';

const getNumberOfGuests = (currentAdd) => currentAdd.offer.guests === Number(housingGuests.value) || housingGuests.value === 'any';

const getSelectFeatures = (currentAdd) => {
  const housingFeatures = document.querySelector('.map__filters').querySelectorAll('.map__checkbox:checked');
  const featuresValue = [...housingFeatures].map((item) => item.value);

  if (!currentAdd.offer.features) {
    return false;
  }
  return featuresValue.every((value) => currentAdd.offer.features.includes(value));
};

const getFilterValue = (offers) => {
  document.querySelector('.map__filters').addEventListener('change', debounce(() => {
    const filteredOffers = offers.filter((offer) => getHouseType(offer) && getHousePrice(offer) && getNumberOfRooms(offer) && getNumberOfGuests(offer) && getSelectFeatures(offer));
    markerGroup.clearLayers();
    renderAnnouncementList(filteredOffers.slice(0, SIMILAR_ADD_COUNT));
  },
  ));

  document.querySelector('.map__filters').removeEventListener('change', debounce());
};

export {getFilterValue};
