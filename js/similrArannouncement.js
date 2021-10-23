import {TYPE_OF_HOUSING_RUS} from './arrays-and-variables.js';

const templateCard = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('.map__canvas');

const itemHide = (item) => {
  if(item.innerText === '') {
    item.remove();
  }
};

const createNewAnnouncementElement = (Array) => {
  const item = Array[0];
  const announcementElement = templateCard.cloneNode(true);

  const author = announcementElement.querySelector('.popup__avatar');
  author.innerHTML = '';
  author.src = item.author;

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

  item.offer.features.forEach((feature) => {
    const featureItem = featuresList.querySelector(`.popup__feature--${feature}`);

    if (featureItem) {
      featuresContainer.append(featureItem);
    }
  });

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
  for(let i = 0; i < item.offer.photos.length; i++) {
    const imgPhotoCopy = imgPhotoCopyFind.cloneNode(true);
    imgPhotoContainer.appendChild(imgPhotoCopy);
    imgPhotoCopy.src = item.offer.photos[i];
  }

  mapCanvas.appendChild(announcementElement);
};

export {createNewAnnouncementElement};

