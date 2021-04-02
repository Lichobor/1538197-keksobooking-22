import { isUseEsc } from './util.js';
import { getFieldsEmpty } from './form-user.js';

const main = document.querySelector('main');
const templeSuccess = document.querySelector('#success').content;
const messageSuccess = templeSuccess.querySelector('.success');
const templeError = document.querySelector('#error').content;
const messageError = templeError.querySelector('.error');
const buttonError = messageError.querySelector('.error__button');

const onMessageSuccessEscKey = (evt) => {
  if (isUseEsc(evt)) {
    evt.preventDefault();
    newElementSuccess.classList.add('hidden');
    getFieldsEmpty(evt);
  }
  document.removeEventListener('keydown', onMessageSuccessEscKey);
};

const onMessageSuccessClick = (evt) => {
  newElementSuccess.classList.add('hidden');
  getFieldsEmpty(evt);
  document.removeEventListener('click', onMessageSuccessClick);
};

const newElementSuccess = messageSuccess.cloneNode(true);
newElementSuccess.classList.add('hidden');
main.appendChild(newElementSuccess);

const getMessageSuccess = () => {
  newElementSuccess.classList.remove('hidden');

  document.addEventListener('keydown', onMessageSuccessEscKey);
  document.addEventListener('click', onMessageSuccessClick);
};

const newElementError = messageError.cloneNode(true);
newElementError.classList.add('hidden');
main.appendChild(newElementError);

const onMessageErrorClick = () => {
  newElementError.classList.add('hidden');
  document.removeEventListener('click', onMessageErrorClick);
};

const onMessageErrorEscKey = (evt) => {
  if (isUseEsc(evt)) {
    evt.preventDefault();
    newElementError.classList.add('hidden');
  }
  document.removeEventListener('keydown', onMessageErrorEscKey);
};

const getMessageError = () => {
  newElementError.classList.remove('hidden');

  document.addEventListener('keydown', onMessageErrorEscKey);

  document.addEventListener('click', onMessageErrorClick);

  buttonError.addEventListener('click', onMessageErrorClick);
}

export { getMessageSuccess, getMessageError };
