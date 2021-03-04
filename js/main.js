
// Возвращает целое число

const getRandomWholeNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min === max || min > max) {
    return 'Ошибка'
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomWholeNumber(1.2, 9.7);


// Возвращает число с плавающей точкой

const getRandomFractionalNumber = (min, max, limit) => {
  if (min === max || min > max) {
    return 'Ошибка'
  }
  let number = Math.random () * (max - min) + min;
  return +number.toFixed(limit);

}

getRandomFractionalNumber (1.2, 12.88, 4);


