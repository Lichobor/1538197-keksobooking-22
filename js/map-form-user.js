/* global _:readonly */
import { getAds } from './create-map.js';

const TIME_DEBOUNCE = 500;
const MAX_LENGHT_ARRAY = 10;

const mapFilter = document.querySelector('.map__filters');
const userHousingType = mapFilter.querySelector('#housing-type');
const userHousingPrice = mapFilter.querySelector('#housing-price');
const userHousingRooms = mapFilter.querySelector('#housing-rooms');
const userHousingGuests = mapFilter.querySelector('#housing-guests');

const priceValues = [50000, 10000];

const getMapFilterValue = (offers) => {
  const getMapFilterFeatures = (offers) => {
    const checkedFeatures = Array.from(mapFilter.querySelectorAll('.map__checkbox:checked'));

    if (checkedFeatures.length === 0) {
      return true;
    }

    return checkedFeatures.every((feature) => offers.offer.features.includes(feature.value));
  }

  const isHousingType = (item) => {
    return userHousingType.value === item.offer.type || userHousingType.value === 'any';
  }

  const isHousingPrice = (item) => {
    if (userHousingPrice.value === 'high') {
      return item.offer.price > priceValues[0];
    } else if (userHousingPrice.value === 'low') {
      return item.offer.price < priceValues[1];
    } else if (userHousingPrice.value === 'middle') {
      return item.offer.price >= priceValues[1] && item.offer.price <= priceValues[0];
    } else {
      return true;
    }
  }

  const isHousingRoomsOrGuests = (select, item, num1, num2, num3) => {
    if (select.value === num1.toString()) {
      return item === num1;
    } else if (select.value === num2.toString()) {
      return item === num2;
    } else if (select.value === num3.toString()) {
      return item === num3;
    } else {
      return true;
    }
  }

  const getAdsThroughDebounce = _.debounce((array) => getAds(array), TIME_DEBOUNCE);

  mapFilter.addEventListener('change', () => {
    const newArrayValues = [];
    offers.some((offer) => {
      if (isHousingType(offer) &&
        isHousingPrice(offer) &&
        isHousingRoomsOrGuests(userHousingRooms, offer.offer.rooms, 3, 2, 1) &&
        isHousingRoomsOrGuests(userHousingGuests, offer.offer.guests, 0, 1, 2) &&
        getMapFilterFeatures(offer)
      ) {
        newArrayValues.push(offer)
      }
      if (newArrayValues.length === MAX_LENGHT_ARRAY) {
        return true;
      }
      getAdsThroughDebounce(newArrayValues);
    })
  })
}

export { getMapFilterValue };
