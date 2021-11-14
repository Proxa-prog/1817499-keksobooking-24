import {TYPE_OF_HOUSING_RUS} from './arrays-and-variables.js';
import {mapFiltersWindow} from './form.js';
import {onError} from './utils/utils.js';
import {getData} from './api.js';
import {renderAnnouncementList} from './map.js';
import {markerGroup} from './map.js';

const housingFeatures = mapFiltersWindow.querySelector('#housing-features').querySelectorAll('input');
const templateCard = document.querySelector('#card').content.querySelector('.popup');
const housingType = mapFiltersWindow.querySelector('#housing-type');
const housingPrice = mapFiltersWindow.querySelector('#housing-price');
const housingRooms = mapFiltersWindow.querySelector('#housing-rooms');
const housingGuests = mapFiltersWindow.querySelector('#housing-guests');
let housingTypeCurrent = '';
let housingPriceCurrent = '';
let housingRoomsCurrent = '';
let housingGuestsCurrent = '';


const itemHide = (item) => {
  if(item.innerText === '') {
    item.remove();
  }
};

const createNewAnnouncementElement = (item) => {
  const announcementElement = templateCard.cloneNode(true);

  const author = announcementElement.querySelector('.popup__avatar');
  author.innerHTML = '';
  author.src = item.author.avatar;

  const title = announcementElement.querySelector('.popup__title');
  title.innerHTML = '';
  title.textContent = item.offer.title;

  const address = announcementElement.querySelector('.popup__text--address');
  address.innerHTML = '';
  address.textContent = item.offer.address;
  itemHide(address);

  const price = announcementElement.querySelector('.popup__text--price');
  price.innerHTML = '';
  price.textContent = `${item.offer.price} ₽/ночь`;
  itemHide(price);

  const capacity = announcementElement.querySelector('.popup__text--capacity');
  capacity.innerHTML = '';
  capacity.textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;
  itemHide(capacity);

  const time = announcementElement.querySelector('.popup__text--time');
  time.innerHTML = '';
  time.textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;
  itemHide(time);

  const description = announcementElement.querySelector('.popup__description');
  description.innerHTML = '';
  description.textContent = item.offer.description;
  itemHide(description);

  const featuresList = announcementElement.querySelector('.popup__features');
  const featuresContainer = document.createDocumentFragment();

  const features = item.offer.features;

  if (features) {
    features.forEach((feature) => {
      const featureItem = featuresList.querySelector(`.popup__feature--${feature}`);

      if (featureItem) {
        featuresContainer.append(featureItem);
      }
    });
  } else {
    featuresList.remove();
  }


  featuresList.innerHTML = '';
  featuresList.append(featuresContainer);

  const typeIndex = item.offer.type;
  TYPE_OF_HOUSING_RUS.forEach((itemTypeOfHousing) => {
    if(Object.keys(itemTypeOfHousing)[0] === typeIndex) {
      announcementElement.querySelector('.popup__type').textContent = Object.values(itemTypeOfHousing);
    }
  });

  const imgPhotoContainer = announcementElement.querySelector('.popup__photos');
  const imgPhotoCopyFind = imgPhotoContainer.querySelector('.popup__photo');

  imgPhotoContainer.innerHTML = '';

  const photo = item.offer.photos;
  if (photo) {
    for(let i = 0; i < item.offer.photos.length; i++) {
      const imgPhotoCopy = imgPhotoCopyFind.cloneNode(true);
      imgPhotoContainer.appendChild(imgPhotoCopy);
      imgPhotoCopy.src = item.offer.photos[i];
    }
  } else {
    imgPhotoContainer.remove();
  }

  return announcementElement;
};

const getHouseType = () => {
  housingTypeCurrent = housingType.value;
  return housingTypeCurrent;
};

const getHousePrice = () => {
  housingPriceCurrent = housingPrice.value;
  return housingPriceCurrent;
};

const getNumberOfRooms = () => {
  housingRoomsCurrent = Number(housingRooms.value);
  return housingRoomsCurrent;
};

const getNumberOfGuests = () => {
  housingGuestsCurrent = housingGuests.value;
  return housingGuestsCurrent;
};

const getSelectFeatures = (item) => {
  let featureRank = 0;
  if (item.offer.features) {
    for (let i = 0; i < housingFeatures.length; i++) {
      if (housingFeatures[i].checked) {
        if (housingFeatures[i].value === item.offer.features[i]) {
          featureRank += 1;
        }
      }
    }
  }

  return featureRank;
};

const getFilterValue = () => {
  markerGroup.clearLayers();
  getData(renderAnnouncementList, onError);
  markerGroup.unbindPopup();
};

mapFiltersWindow.addEventListener('change', getFilterValue);


const getAddRank = (advert, houseType, housePrice, howManyRooms, homManyGuests, featuresRank) => {
  let rank = 0;

  if (houseType === advert.offer.type) {
    rank += 1;
  }

  switch (housePrice) {
    case 'middle':
      if (advert.offer.price > 10000 && advert.offer.price < 50000) {
        rank += 2;
      }
      break;
    case 'low':
      if (advert.offer.price < 10000) {
        rank += 1;
      }
      break;
    case 'high':
      if (advert.offer.price > 50000) {
        rank += 3;
      }
      break;
    default:
      rank += 0;
  }

  if (howManyRooms === advert.offer.rooms) {
    rank += 1;
  } else {
    rank += 0;
  }

  if (homManyGuests === String(advert.offer.guests)) {
    rank += 1;
  } else if (homManyGuests === '0') {
    rank += 2;
  } else {
    rank += 0;
  } // не понимаю как правильно сделать поля "не для гостей" и "любое число гостей"

  rank += featuresRank;
  return rank;
};


const compareAdvert = (advert1, advert2) => {
  const rank1 = getAddRank(advert1, getHouseType(), getHousePrice(), getNumberOfRooms(), getNumberOfGuests(), getSelectFeatures(advert1));
  const rank2 = getAddRank(advert2, getHouseType(), getHousePrice(), getNumberOfRooms(), getNumberOfGuests(), getSelectFeatures(advert2));

  return rank2 - rank1;
};

export {createNewAnnouncementElement, compareAdvert};
