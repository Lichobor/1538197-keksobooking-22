const form = document.querySelector('.ad-form');
const fieldsets = form.querySelectorAll('fieldset');
const stateCapacity = form.querySelector('[name="capacity"]');
const mapFilter = document.querySelector('.map__filters');
const mapItems = Array.from(mapFilter.children);

const getDisabled = (array) => {
  array.forEach((value) => {
    value.setAttribute('disabled', '');
    value.parentElement.classList.add('ad-form--disabled');
  })
};

getDisabled(fieldsets);
getDisabled(mapItems);

const getIncluded = (array) => {
  array.forEach((value) => {
    value.removeAttribute('disabled');
    value.parentElement.classList.remove('ad-form--disabled');
    stateCapacity.children[0].setAttribute('disabled', '');
    stateCapacity.children[1].setAttribute('disabled', '');
    stateCapacity.children[3].setAttribute('disabled', '');
  })
};

export { getIncluded, fieldsets, mapItems };
