import { addressMarkerArray, createMarker } from './create-map.js';
import { getMessageError, getMessageSuccess } from './show-message.js';
import {sendData} from './api.js';

const MIN_LENGHT_NAME = 30;
const MAX_LENGHT_NAME = 100;
const MAX_PRICE = 1000000;

const form = document.querySelector('.ad-form');
const userPriceInput = form.querySelector('[name="price"]');
const userSelectType = form.querySelector('[name="type"]');
const userSelectRooms = form.querySelector('[name="rooms"]');
const userSelectCapacity = form.querySelector('[name="capacity"]');
const userTitleInput = form.querySelector('[name="title"]');
const userTimeinSelect = form.querySelector('[name="timein"]');
const userTimeoutSelect = form.querySelector('[name="timeout"]');
const addressInput = form.querySelector('#address');
const formButtonReset = form.querySelector('.ad-form__reset');
const formMapFilter = document.querySelector('.map__filters');

const getFieldsEmpty = (evt) => {
  evt.preventDefault();
  form.reset();
  formMapFilter.reset();
  userPriceInput.placeholder = 1000;

  userTimeinSelect.children[0].selected = true;

  userTimeoutSelect.children[0].selected = true;

  addressInput.value = addressMarkerArray[0] + ', ' + addressMarkerArray[1];
  createMarker.setLatLng(
    {
      lat: 35.68519,
      lng: 139.75724,
    });
};

formButtonReset.addEventListener('click', (evt) => {
  getFieldsEmpty(evt);
});

const getPriceInputNumber = (number) => {
  userPriceInput.min = number;
  userPriceInput.placeholder = number;
};

userSelectType.addEventListener('change', () => {
  if (userSelectType.value === 'flat') {
    getPriceInputNumber(1000);
  }
  else if (userSelectType.value === 'bungalow') {
    getPriceInputNumber(0);
  }
  else if (userSelectType.value === 'house') {
    getPriceInputNumber(5000);
  }
  else if (userSelectType.value === 'palace') {
    getPriceInputNumber(10000);
  }
});

userSelectRooms.addEventListener('change', () => {
  const capacityArray = userSelectCapacity.querySelectorAll('option');

  if (Number(userSelectRooms.value) === 3) {
    capacityArray[0].disabled = false;
    capacityArray[1].disabled = false;
    capacityArray[2].disabled = false;
    capacityArray[3].disabled = true;

    capacityArray[0].selected = true;
  } else if (Number(userSelectRooms.value) === 2) {
    capacityArray[0].disabled = true;
    capacityArray[1].disabled = false;
    capacityArray[2].disabled = false;
    capacityArray[3].disabled = true;

    capacityArray[1].selected = true;
  } else if (Number(userSelectRooms.value) === 1) {
    capacityArray[0].disabled = true;
    capacityArray[1].disabled = true;
    capacityArray[3].disabled = true;
    capacityArray[2].disabled = false;

    capacityArray[2].selected = true;
  } else if (Number(userSelectRooms.value) === 100) {
    capacityArray[0].disabled = true;
    capacityArray[1].disabled = true;
    capacityArray[2].disabled = true;
    capacityArray[3].disabled = false;

    capacityArray[3].selected = true;
  }
});

const getAttrSelectedTime = (selectTimeout, selectTimein, child1, child2, child3) => {
  const childrenSelectorTimeout = selectTimeout.children;
  const childrenSelectorTimein = selectTimein.children

  childrenSelectorTimeout[child1].setAttribute('selected', '');
  childrenSelectorTimeout[child2].removeAttribute('selected');
  childrenSelectorTimeout[child3].removeAttribute('selected');

  childrenSelectorTimein[child1].setAttribute('selected', '');
  childrenSelectorTimein[child2].removeAttribute('selected');
  childrenSelectorTimein[child3].removeAttribute('selected');
};

const onSelectTimeChangeValue = (selectTime) => (evt) => {
  if (evt.target.value === '12:00') {
    selectTime.value = '12:00';

    getAttrSelectedTime(userTimeoutSelect, userTimeinSelect, 0, 1, 2);
  } else if (evt.target.value === '13:00') {
    selectTime.value = '13:00';

    getAttrSelectedTime(userTimeoutSelect, userTimeinSelect, 1, 2, 0);
  } else if (evt.target.value === '14:00') {
    selectTime.value = '14:00';

    getAttrSelectedTime(userTimeoutSelect, userTimeinSelect, 2, 1, 0);
  }
};

userTimeinSelect.addEventListener('change', onSelectTimeChangeValue(userTimeoutSelect));

userTimeoutSelect.addEventListener('change', onSelectTimeChangeValue(userTimeinSelect));

userPriceInput.addEventListener('input', () => {
  if (userPriceInput.value > MAX_PRICE) {
    userPriceInput.setCustomValidity('');
  }
  userPriceInput.reportValidity();
});

userTitleInput.addEventListener('input', () => {
  const titleLength = userTitleInput.value.length;

  if (titleLength < MIN_LENGHT_NAME) {
    userTitleInput.setCustomValidity('Ещё ' + (MIN_LENGHT_NAME - titleLength) + ' симв.');
  }
  else if (titleLength > MAX_LENGHT_NAME) {
    userTitleInput.setCustomValidity('Удалите ' + (titleLength - MAX_LENGHT_NAME) + ' симв.')
  } else {
    userTitleInput.setCustomValidity('');
  }
  userTitleInput.reportValidity();
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    () => getMessageSuccess(),
    () => getMessageError(),
    new FormData(evt.target),
  );
});

export { getFieldsEmpty };
