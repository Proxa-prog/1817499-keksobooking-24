import {TYPE_OF_HOUSING_RUS, TYPE_OF_HOUSING} from './arrays-and-variables.js';
import {createArrayAd} from './main.js';

const templateCard = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('.map__canvas');
const featuresContainer = document.createDocumentFragment();

const itemHide = (item) => {
  if(item === '') {
    item.hide;
  }
};

const createNewAnnouncementElement = () => {
  createArrayAd.forEach((item) => {
    const announcementElement = templateCard.cloneNode(true);
    mapCanvas.appendChild(announcementElement);

    let author = announcementElement.querySelector('.popup__avatar');
    author.src = item.author;
    itemHide(author);

    let title = announcementElement.querySelector('.popup__title');
    title.textContent = item.offer.title;
    itemHide(title);

    let address = announcementElement.querySelector('.popup__text--address');
    address.textContent = item.offer.address;
    itemHide(address);


    let price = announcementElement.querySelector('.popup__text--price');
    price.textContent = item.offer.price + ' ₽/ночь'; // линтер ругается на конкатенацию
    itemHide(price);


    let capacity = announcementElement.querySelector('.popup__text--capacity');
    capacity.textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей'; // линтер ругается на конкатенацию
    itemHide(capacity);


    let time = announcementElement.querySelector('.popup__text--time');
    time.textContent = 'Заезд после' + item.offer.checkin + ', выезд до' + item.offer.checkout; // линтер ругается на конкатенацию
    itemHide(time);

    let description = announcementElement.querySelector('.popup__description');
    description.textContent = item.offer.description;
    itemHide(description);


    item.offer.features.forEach((features) => {
      const featuresList = announcementElement.querySelector('.popup__features').querySelector('.popup__feature--' + features); // линтер ругается на конкатенацию

      if(featuresList) {
        featuresContainer.append(featuresList);
      }

      let typeIndex = item.offer.type; // Линтер ругается, говорит что надо const

      TYPE_OF_HOUSING.forEach((itemTypeOfHousing) => {
        if(itemTypeOfHousing === typeIndex) {
          const TYPE_INDEX_ARRAY = TYPE_OF_HOUSING.indexOf(itemTypeOfHousing);
          const TYPE_INDEX_ARRAY_RUS = TYPE_OF_HOUSING_RUS[TYPE_INDEX_ARRAY];
          announcementElement.querySelector('.popup__type').textContent = TYPE_INDEX_ARRAY_RUS;
        }
      });
    });

    let imgPhotoContainer = announcementElement.querySelector('.popup__photos'); // Линтер ругается, говорит что надо const
    let imgPhotoCopyFind = imgPhotoContainer.querySelector('.popup__photo'); // Линтер ругается, говорит что надо const

    imgPhotoContainer.innerHTML = '';
    for(let i = 0; i < item.offer.photos.length; i++) {
      let imgPhotoCopy = imgPhotoCopyFind.cloneNode(true);
      imgPhotoContainer.appendChild(imgPhotoCopy);
      let allPhoto = imgPhotoContainer.querySelectorAll('.popup__photo'); // Линтер ругается, говорит что надо const
      allPhoto[i].src = item.offer.photos[i];
    }
  });
};

export {createNewAnnouncementElement};

