import {TYPE_OF_HOUSING_RUS, TYPE_OF_HOUSING} from './arrays-and-variables.js';
import {createArrayAd} from '../main.js';

const templateCard = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('.map__canvas');
const featuresContainer = document.createDocumentFragment();


createArrayAd.forEach((item) => {
  const announcementElement = templateCard.cloneNode(true);
  mapCanvas.appendChild(announcementElement);
  announcementElement.querySelector('.popup__avatar').src = item.author.au.author;
  announcementElement.querySelector('.popup__title').textContent = item.offer.title;
  announcementElement.querySelector('.popup__text--address').textContent = item.offer.address;
  announcementElement.querySelector('.popup__text--price').textContent = item.offer.price + ' ₽/ночь';
  announcementElement.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
  announcementElement.querySelector('.popup__text--time').textContent = 'Заезд после' + item.offer.checkin + ', выезд до' + item.offer.checkout;

  const popupFeature = announcementElement.querySelector('.popup__features');

  item.offer.features.forEach((features) => {
    const featuresList = announcementElement.querySelector('.popup__features').querySelector('.popup__feature--' + features);

    if(featuresList) {
      featuresContainer.append(featuresList);
    }

    const TYPE_INDEX = item.offer.type;

    TYPE_OF_HOUSING.forEach((item) => {
      if(item === TYPE_INDEX) {
        const TYPE_INDEX_ARRAY = TYPE_OF_HOUSING.indexOf(item);
        const TYPE_INDEX_ARRAY_RUS = TYPE_OF_HOUSING_RUS[TYPE_INDEX_ARRAY];
        announcementElement.querySelector('.popup__type').textContent = TYPE_INDEX_ARRAY_RUS;
      }
    })
  });
  announcementElement.querySelector('.popup__description').textContent = item.offer.description;

  let imgPhotoContainer = announcementElement.querySelector('.popup__photos');
  const IMG_PHOTO_COPY = imgPhotoContainer.querySelector('.popup__photo').cloneNode(true);

  imgPhotoContainer.innerHTML = '';
  for(let i = 0; i < item.offer.photos.length; i++) {
    console.log(item.offer.photos[i]);
    imgPhotoContainer.appendChild(IMG_PHOTO_COPY); // вставляю в конец div копию разметки img
    let allPhoto = imgPhotoContainer.querySelectorAll('.popup__photo'); // помещаю все img в контейнере в переменную
    console.log(allPhoto);
    allPhoto[i].src = item.offer.photos[i]; // присваиваю каждому элементу новое значение src
  }
  console.log(imgPhotoContainer);
});

