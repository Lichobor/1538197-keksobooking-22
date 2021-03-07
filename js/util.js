// Функции

// Возвращает целое число

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min < 0 || max < 0) {
    return 'Ошибка! Введите положительное число';
  }
  if (min === max || min > max) {
    return 'Ошибка! min должно быть больше, чем max';
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Возвращает число с плавающей точкой

const getRandomPoint = (min, max, limit) => {
  if (min < 0 || max < 0) {
    return 'Ошибка! Введите положительное число';
  }
  if (min === max || min > max) {
    return 'Ошибка! min должно быть больше, чем max';
  }
  return +(Math.random () * (max - min) + min).toFixed(limit);
};

// Выбирает значение из списка

const getRandomValue = (value) => {
  return value[getRandomNumber(0, value.length - 1)];
};

// Возвращает часть массива

const getRandomArray = (array) => {
  return array.slice(getRandomNumber(0, array.length));
};

export {getRandomNumber, getRandomPoint, getRandomValue, getRandomArray};
