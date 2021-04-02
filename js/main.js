import { getData } from './api.js';
import {getAds} from './create-map.js';
import {getMapFilterValue} from './map-form-user.js';
import './form-state.js';
import './form-user.js';
import './map-form-user.js';

getData((offers) => {
  getAds(offers);
  getMapFilterValue(offers);
});
