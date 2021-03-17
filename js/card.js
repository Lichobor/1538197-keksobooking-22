
import {createAd} from './data.js'

const templateCard = document.querySelector('#card').content.querySelector('.popup');

const typeHousing = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

const ROOMS = ['комната','комнаты','комнат'];
const GUESTS = ['гость', 'гостя', 'гостей'];

const changeEnding = (num, word) => {
  if (num === 1) {
    return `${num} ${word[0]}`;
  }
  if (num > 1 && num <= 4) {
    return `${num} ${word[1]}`;
  }
  if (num > 4) {
    return `${num} ${word[2]}`;
  }
};

const createFeatures = (featuresArray) => {
  const featuresFragment = document.createDocumentFragment();
  for (let i = 0; i < featuresArray.length; i++) {
    const featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature', 'popup__feature--' + featuresArray[i]);
    featuresFragment.appendChild(featureItem);
  }
  return featuresFragment;
};

const createPhotos = (photosArray, template) => {
  const photosFragment = document.createDocumentFragment();
  for (let i = 0; i < photosArray.length; i++) {
    const photo = template.cloneNode(true);
    photo.src = photosArray[i];
    photosFragment.appendChild(photo);
  }
  return photosFragment;
};


const createCard = (createAd) => {
  const card = templateCard.cloneNode(true);
  card.querySelector('.popup__title').textContent = createAd.offer.title;
  card.querySelector('.popup__text--address').textContent = createAd.offer.address;
  card.querySelector('.popup__text--price').textContent = `${createAd.offer.price} ₽/ночь`;
  card.querySelector('.popup__type').textContent = typeHousing[createAd.offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${changeEnding(createAd.offer.rooms)} для ${changeEnding(createAd.offer.guests)}`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${createAd.offer.checkin}, выезд после ${createAd.offer.checkout}`;
  card.querySelector('.popup__description').textContent = createAd.offer.description;
  card.querySelector('.popup__avatar').src = createAd.author.avatar;

  const featuresList = card.querySelector('.popup__features');
  featuresList.innerHTML = '';
  const cardFeaturesItems = createFeatures(createAd.offer.features);
  featuresList.appendChild(cardFeaturesItems);

  const imgList = card.querySelector('.popup__photos');
  const imgTemplate = imgList.querySelector('.popup__photo');
  imgList.innerHTML = '';
  const cardPhotos = createPhotos(createAd.offer.photos, imgTemplate);
  imgList.appendChild(cardPhotos);

  return card;
};

const map = document.querySelector('.map__canvas');
map.textContent = createCard (createAd);

export {createCard};
