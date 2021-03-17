import {getRandomNumber, getRandomPoint, getRandomValue, getRandomArray} from './util.js';

// Массивы

const TITLE = [
  'Замок с привидениями',
  'Терем с балконом',
  'Дом с мезонином',
  'Шалаш в лесу',
];

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
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

const DESCRIPTION = [
  'Вид на море',
  'Лесной воздух',
  'Старинный интерьер',
  'Собственный парк',
];

const FOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

// Объекты

const countAd = 10;

const createAd = () => {
  return {
    author: {
      avatar: 'img/avatars/user' + getRandomNumber (1, 8) + '.png',
    },

    offer: {
      title: getRandomValue (TITLE),
      address: location.x + ', ' + location.y,
      price: getRandomNumber(5000, 50000),
      type: getRandomArray (TYPE),
      rooms: getRandomNumber (1, 4),
      quests: getRandomNumber (1, 15),
      checkin: getRandomValue (CHECKIN),
      checkout: getRandomValue (CHECKOUT),
      features: getRandomArray (FEATURES),
      description: getRandomValue (DESCRIPTION),
      photos: getRandomArray (FOTOS),
    },

    location: {
      x: getRandomPoint (35.65000, 35.70000, 5),
      y: getRandomPoint (139.70000, 139.80000, 5),
    },
  }
}

const generateAd = new Array(countAd).fill(null).map(() => createAd());

export{createAd, generateAd};
