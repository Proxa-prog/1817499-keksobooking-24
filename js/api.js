import {getFilterValue} from './filter.js';
import {renderAnnouncementList} from './map.js';
import {onError} from './utils/utils.js';
import {formReset} from './form.js';

let currentData;

const getData = () => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => {
      renderAnnouncementList(data.slice(0, 10));
      getFilterValue(data);
      currentData = data;
    })
    .catch(() => {
      onError();
    });
};


const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        formReset();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData, currentData};
