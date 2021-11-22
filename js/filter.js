import {renderAnnouncementList, markerGroup} from './map.js';
import {debounce} from './utils/debounce.js';

const SIMILAR_ADD_COUNT = 10;
const ANY_VALUE = 'any';
const PRICE_LOW_VALUE = 'low';
const PRICE_MIDDLE_VALUE = 'middle';
const PRICE_HIGH_VALUE = 'high';
const PRICE_LOW_NUMBER = 10000;
const PRICE_HIGH_NUMBER = 50000;
const mapFiltersElement = document.querySelector('.map__filters');
const housingTypeElement = mapFiltersElement.querySelector('#housing-type');
const housingPriceElement = mapFiltersElement.querySelector('#housing-price');
const housingRoomsElement = mapFiltersElement.querySelector('#housing-rooms');
const housingGuestsElement = mapFiltersElement.querySelector('#housing-guests');


const getHouseType = (currentAdd) => currentAdd.offer.type === housingTypeElement.value || housingTypeElement.value === ANY_VALUE;

const getHousePrice = (currentAdd) => housingPriceElement.value === ANY_VALUE
  || currentAdd.offer.price < PRICE_LOW_NUMBER && housingPriceElement.value === PRICE_LOW_VALUE
  || currentAdd.offer.price >= PRICE_LOW_NUMBER && currentAdd.offer.price < PRICE_HIGH_NUMBER && housingPriceElement.value === PRICE_MIDDLE_VALUE
  || currentAdd.offer.price > PRICE_HIGH_NUMBER && housingPriceElement.value === PRICE_HIGH_VALUE;

const getNumberOfRooms = (currentAdd) => currentAdd.offer.rooms === Number(housingRoomsElement.value) || housingRoomsElement.value === ANY_VALUE;

const getNumberOfGuests = (currentAdd) => currentAdd.offer.guests === Number(housingGuestsElement.value) || housingGuestsElement.value === ANY_VALUE;

const getSelectFeatures = (currentAdd) => {
  const housingFeatures = mapFiltersElement.querySelectorAll('.map__checkbox:checked');
  const featuresValue = [...housingFeatures].map((item) => item.value);

  if (!currentAdd.offer.features) {
    return false;
  }
  return featuresValue.every((value) => currentAdd.offer.features.includes(value));
};

const getFilterValue = (offers) => {
  mapFiltersElement.addEventListener('change', debounce(() => {
    const filteredOffers = [];
    let count = 0;

    while (count < offers.length) {
      if (getHouseType(offers[count]) && getHousePrice(offers[count]) && getNumberOfRooms(offers[count]) && getNumberOfGuests(offers[count]) && getSelectFeatures(offers[count])) {
        filteredOffers.push(offers[count]);

        if (filteredOffers.length === SIMILAR_ADD_COUNT) {
          break;
        }
        count++;
      } else {
        count++;
      }
    }

    markerGroup.clearLayers();
    renderAnnouncementList(filteredOffers);
  }));
};

export {getFilterValue};
