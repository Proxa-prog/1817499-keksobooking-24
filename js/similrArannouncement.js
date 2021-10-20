import {TYPE_OF_HOUSING_RUS, TYPE_OF_HOUSING} from './arrays-and-variables.js';

const templateCard = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('.map__canvas');
const featuresContainer = document.createDocumentFragment();

const itemHide = (item) => {
  if(item === '') {
    item.hide;
  }
};

const createNewAnnouncementElement = (Array) => {
  Array.forEach((item) => {
    const announcementElement = templateCard.cloneNode(true);
    mapCanvas.appendChild(announcementElement);

    const author = announcementElement.querySelector('.popup__avatar');
    author.src = item.author;
    itemHide(author);

    const title = announcementElement.querySelector('.popup__title');
    title.textContent = item.offer.title;
    itemHide(title);

    const address = announcementElement.querySelector('.popup__text--address');
    address.textContent = item.offer.address;
    itemHide(address);

    const price = announcementElement.querySelector('.popup__text--price');
    price.textContent = `${item.offer.price} ₽/ночь`;
    itemHide(price);

    const capacity = announcementElement.querySelector('.popup__text--capacity');
    capacity.textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;
    itemHide(capacity);

    const time = announcementElement.querySelector('.popup__text--time');
    time.textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;
    itemHide(time);

    const description = announcementElement.querySelector('.popup__description');
    description.textContent = item.offer.description;
    itemHide(description);


    item.offer.features.forEach((features) => {
      const featuresList = announcementElement.querySelector('.popup__features').querySelector(`.popup__feature--${features}`);

      if(featuresList) {
        featuresContainer.append(featuresList);
      }

      const typeIndex = item.offer.type;

      TYPE_OF_HOUSING.forEach((itemTypeOfHousing) => {
        if(itemTypeOfHousing === typeIndex) {
          const TYPE_INDEX_ARRAY = TYPE_OF_HOUSING.indexOf(itemTypeOfHousing);
          const TYPE_INDEX_ARRAY_RUS = TYPE_OF_HOUSING_RUS[TYPE_INDEX_ARRAY];
          announcementElement.querySelector('.popup__type').textContent = TYPE_INDEX_ARRAY_RUS;
        }
      });
    });

    const imgPhotoContainer = announcementElement.querySelector('.popup__photos');
    const imgPhotoCopyFind = imgPhotoContainer.querySelector('.popup__photo');

    imgPhotoContainer.innerHTML = '';
    for(let i = 0; i < item.offer.photos.length; i++) {
      const imgPhotoCopy = imgPhotoCopyFind.cloneNode(true);
      imgPhotoContainer.appendChild(imgPhotoCopy);
      const allPhoto = imgPhotoContainer.querySelectorAll('.popup__photo');
      allPhoto[i].src = item.offer.photos[i];
    }
  });
};

export {createNewAnnouncementElement};

