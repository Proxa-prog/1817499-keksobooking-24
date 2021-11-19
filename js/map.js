import {createNewAnnouncementElement} from './similar-arannouncement.js';
import {startFormActivation} from './form.js';
import {getData, currentData} from './api.js';

const addressElement = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    getData();
    startFormActivation();
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

const markerGet = marker.getLatLng();
addressElement.value = `${markerGet.lat} ${markerGet.lng}`;

marker.addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const renderAnnouncementList = (elements) => {
  elements.forEach((item) => {
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

const mapReset = () => {
  marker.setLatLng(
    {
      lat: 35.68405,
      lng: 139.75312,
    });

  map
    .setView({
      lat: 35.68405,
      lng: 139.75312,
    }, 10);

  markerGroup.clearLayers();
  renderAnnouncementList(currentData.slice(0, 10));
  markerGroup.unbindPopup();
};

addressElement.readOnly = true;

marker.on('moveend', (evt) => {
  const currentAddress = evt.target.getLatLng();
  const currentLat = currentAddress.lat;
  const currentLng = currentAddress.lng;
  addressElement.value = `${currentLat.toFixed(5)} ${currentLng.toFixed(5)}`;
});

export {renderAnnouncementList, marker, addressElement, markerGroup, map, mapReset, markerGet};
