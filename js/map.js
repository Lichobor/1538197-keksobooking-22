/* global L:readonly */
const myMap = L.map('map-canvas')
  .on('load', () => {
    console.log('Карта инициализирована')
  })
  .setView({
    lat: 59.92749,
    lng: 30.31127,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(myMap);

const points = [
  {
    title: 'Футура',
    lat: 59.96925,
    lng: 30.31730,
  },
  {
    title: 'Шаверма',
    lat: 59.96783,
    lng: 30.31258,
  },
  {
    title: 'Франк',
    lat: 59.95958,
    lng: 30.30228,
  },
  {
    title: 'Ginza',
    lat: 59.97292,
    lng: 30.31982,
  },
];

const createCustomPopup = ({lat, lng, title}) => `<section class="balloon">
  <h3 class="balloon__title">${title}</h3>
  <p class="balloon__lat-lng">Координаты: ${lat}, ${lng}</p>
</section>`;

points.forEach((point) => {
  const {lat, lng} = point;
  const icon = L.icon({
    iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const myMarker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  myMarker
    .addTo(myMap)
    .bindPopup(
      createCustomPopup (point),
      {
        keepInView: true,
      },

    );
});
