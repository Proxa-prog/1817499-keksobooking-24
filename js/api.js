import {renderAnnouncementList} from'./map.js';

const getData = () => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => {
      renderAnnouncementList(data);
    })
    .catch(() => {

    });
};

export {getData};
