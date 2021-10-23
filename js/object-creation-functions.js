import {ARRAY_LENGTH, TYPE_OF_HOUSING, CHECKIN, CHECKOUT, FEATURES, PHOTO, TITLE, DESCRIPTION} from './arrays-and-variables.js';
import {getRandomPositiveFloat} from './utils/get-random-positive-float.js';
import {getRandomPositiveInteger} from './utils/get-random-positive-integer.js';

let authorCount = 0;
let featuresCount = 0;
let photoCount = 0;

const createAuthor = () => {
  for(let count = authorCount; count < ARRAY_LENGTH; count++) {
    authorCount++;
    if (count > 0) {
      return `img/avatars/user0${count}.png`;
    }
    return 'img/avatars/user10.png';
  }
};

const createFeatures = () => {
  for(let count = featuresCount; count < FEATURES.length - 1; count++) {
    featuresCount++;
    if(featuresCount === FEATURES.length - 1) {
      featuresCount = 0;
    }
    return FEATURES[count];
  }
};

const createPhotos = () => {
  for(let count = photoCount; count < PHOTO.length - 1; count++) {
    photoCount++;
    if(photoCount === PHOTO.length - 1) {
      photoCount = 0;
    }
    return PHOTO[count];
  }
};

const createAd = () => {
  const locationlat = getRandomPositiveFloat(35.65000, 35.70000, 5);
  const locationlng = getRandomPositiveFloat(139.70000, 139.80000, 5);

  return {
    author:
      createAuthor(),

    offer: {
      title: TITLE[getRandomPositiveInteger(0, TITLE.length - 1)],
      address: String(`${locationlat}, ${locationlng}`),
      price: getRandomPositiveInteger(1000, 1000000),
      type: TYPE_OF_HOUSING[getRandomPositiveInteger(0, TYPE_OF_HOUSING.length - 1)],
      rooms: getRandomPositiveInteger(1,6),
      guests: getRandomPositiveInteger(1, 15),
      checkin:  CHECKIN[getRandomPositiveInteger(0, CHECKIN.length - 1)],
      checkout: CHECKOUT[getRandomPositiveInteger(0, CHECKOUT.length - 1)],
      features: Array.from({length: getRandomPositiveInteger(1, FEATURES.length - 1)}, createFeatures),
      description: DESCRIPTION[getRandomPositiveInteger(0, DESCRIPTION.length - 1)],
      photos:  Array.from({length: getRandomPositiveInteger(1, PHOTO.length)}, createPhotos),
    },

    location: {
      lat: locationlat,
      lng: locationlng,
    },
  };
};

export {createAd};
