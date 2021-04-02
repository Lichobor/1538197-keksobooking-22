/* global L:readonly */
import { getIncluded, fieldsets, mapItems } from './form-state.js';
import { getAd } from './adding-an-ad.js';

const address = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    getIncluded(fieldsets);
    getIncluded(mapItems);
  })
  .setView({
    lat: 35.68519,
    lng: 139.75724,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const createMarker = L.marker(
  {
    lat: 35.68519,
    lng: 139.75724,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);

const addressMarkerArray = Object.values(createMarker._latlng);
address.value = addressMarkerArray[0] + ', ' + addressMarkerArray[1];
address.setAttribute('readonly', '');
createMarker.addTo(map);

const getPosition = (marker, fact) => {
  marker.on(fact, (evt) => {
    const xY = Object.values(evt.target.getLatLng());
    address.value = xY[0].toFixed(5) + ', ' + xY[1].toFixed(5);
  });
}

getPosition(createMarker, 'moveend');

const icon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const createMiniMarker = (x, y) => L.marker(
  {
    lat: x,
    lng: y,
  },
  {
    icon: icon,
  },
).addTo(map);

const getRemoveMarkers = (arrayMarkers) => {
  arrayMarkers.forEach((value) => {
    map.removeLayer(value);
  });
}

let arrayMarkers = [];

const getAds = (ad) => {
  getRemoveMarkers(arrayMarkers);

  arrayMarkers = [];

  ad.forEach((value) => {
    const getMiniMarker = createMiniMarker(value.location.lat, value.location.lng);

    getPosition(getMiniMarker, 'click');

    getMiniMarker.bindPopup(getAd(value));

    arrayMarkers.push(getMiniMarker);
  });
  return arrayMarkers;
};

export { getAds, addressMarkerArray, map, createMarker, getRemoveMarkers, arrayMarkers };
