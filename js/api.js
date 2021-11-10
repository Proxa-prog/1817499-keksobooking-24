import {onError, showAlert} from './utils/utils.js';

const getData = (create) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => {
      create(data);
    })
    .catch(() => {
      onError();
    });
};


const sendData = (Success, Fail, body) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        Success();
        showAlert('1'); // поставил чтобы понимать какой блок используется
      } else {
        Fail();
        showAlert('2'); // поставил чтобы понимать какой блок используется
      }
    })
    .catch(() => {
      Fail();
      showAlert('3'); // поставил чтобы понимать какой блок используется
    });
};

export {getData, sendData};
