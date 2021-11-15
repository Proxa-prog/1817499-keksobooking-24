import {createNewAnnouncementElement} from './similrArannouncement.js';
import {formActivation} from './form.js';
import {getData} from './api.js';

const address = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {

    getData();
  })
  .setView({
    lat: 35.68405,
    lng: 139.75312,
  }, 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
  {
    lat: 35.68405,
    lng: 139.75312,
  },

  {
    draggable: true,
    icon: mainPinIcon,
  },
);

marker.addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const renderAnnouncementList = (element) => {
  element.forEach((item) => {
    const similarIcon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const similarIconMarker = L.marker(
      {
        lat: item.location.lat,
        lng: item.location.lng,
      },

      {
        similarIcon,
      },
    );

    similarIconMarker
      .addTo(markerGroup)
      .bindPopup(createNewAnnouncementElement(item));
  });
};

address.readOnly = true;

marker.on('moveend', (evt) => {
  const currentAddress = evt.target.getLatLng();
  const currentLat = currentAddress.lat;
  const currentLng = currentAddress.lng;
  address.value = `${currentLat.toFixed(5)} ${currentLng.toFixed(5)}`;
});
formActivation();
export {renderAnnouncementList, marker, address, markerGroup, map};
