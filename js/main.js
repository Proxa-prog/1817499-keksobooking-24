const ARRAY_LENGTH = 10;
let authorCount = 0;
let featuresCount = 0;
let photoCount = 0;

const TYPE_OF_HOUSING = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTO = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const TITLE = [
  'Самые выгодные предложения',
  'Лучший вид из окна во всём Токио!',
  'Соседей практически не слышно!',
  'Цветущая сакура под окном',
  'Соседка угощает пирожками',
  'За углом живёт Хаяо Миядзаки!',
  'До набережной всего 5 минут пешком',
  'Каждый вечер во дворе мини турнир по маджонгу!',
  'Ваша квартира на уровне облаков',
  'У нас самые низкие цены',
];

const DESCRIPTION = [
  'Апартаменты в традиционном, японском стиле',
  'Дёшево и сердито',
  'Дорого и радостно',
  'Для царских особ',
  'Для особ попроще',
  'Крыша есть - не жалуйся',
  'В минималистичном стиле',
  'Максимум комфорта',
  'Что может удивить более четвёртой ванной? Разумеется пятая!',
  'Объеденённая кухня и туалёт - это удобно!',
];

function getRandomPositiveInteger (start, end) {
  const lower = Math.ceil(Math.min(Math.abs(start), Math.abs(end)));
  const upper = Math.floor(Math.max(Math.abs(start), Math.abs(end)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function getRandomPositiveFloat (start, end, digits = 1) {
  const lower = Math.min(Math.abs(start), Math.abs(end));
  const upper = Math.max(Math.abs(start), Math.abs(end));
  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
}

const createAuthor = () => {
  for(let count = authorCount; count < ARRAY_LENGTH; count++) {
    authorCount++;
    if (count > 0) {
      return {author: `img/avatars/user0${count}.png`};
    }
    return {author: 'img/avatars/user10.png'};
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
    author: createAuthor(),
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

const createArrayAd = Array.from({length: ARRAY_LENGTH}, createAd);
createArrayAd[1];
