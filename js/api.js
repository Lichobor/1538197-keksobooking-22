import { showMessage } from './util.js';

const MAX_ADS_COUNT = 10;

const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }

      throw new Error(showMessage('Ошибка! Не удалось получить данные'));
    })
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads.slice(0, MAX_ADS_COUNT));
    })
    .catch((error) => error);
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return response;
      }

      throw new Error(onFail());
    })
    .catch((error) => error);
};

export { getData, sendData };
