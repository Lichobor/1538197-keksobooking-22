const templateFragment = document.querySelector('#card').content;
const popup = templateFragment.querySelector('.popup');

const getAd = (point) => {
  const newElement = popup.cloneNode(true);

  newElement.querySelector('.popup__title').textContent = point.offer.title;
  newElement.querySelector('.popup__text--address').textContent = point.offer.address;
  newElement.querySelector('.popup__text--price').innerHTML = point.offer.price + ' <span>₽/ночь</span>';
  newElement.querySelector('.popup__type').textContent = point.offer.type;
  newElement.querySelector('.popup__text--capacity').textContent = point.offer.rooms + ' комнаты для ' + point.offer.guests + ' гостей';
  newElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + point.offer.checkin + ' выезд до ' + point.offer.checkout;
  newElement.querySelector('.popup__description').textContent = point.offer.description;
  newElement.querySelector('.popup__avatar').src = point.author.avatar;
  const features = newElement.querySelector('.popup__features');

  for (let i = features.children.length - 1; i >= 0; i--) {
    const feature = features.children[i];
    features.removeChild(feature);
  }

  for (let i = 0; i < point.offer.features.length; i++) {
    const li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + point.offer.features[i]);
    features.appendChild(li);
  }

  const photos = newElement.querySelector('.popup__photos');

  if (point.offer.photos.length) {
    photos.children[0].src = point.offer.photos[0];
    for (let i = 1; i < point.offer.photos.length; i++) {
      const img = newElement.querySelector('.popup__photo').cloneNode(true);
      photos.appendChild(img);
      photos.children[i].src = point.offer.photos[i];
    }
  } else {
    photos.removeChild(photos.children[0]);
  }

  return newElement;
}
export { getAd };
