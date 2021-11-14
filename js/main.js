import {onError} from './utils/utils.js';
import {setUserFormSubmit} from './form.js';
import {getData} from './api.js';
import {renderAnnouncementList} from './map.js';

const RERENDER_DELAY = 2000;

getData(_.debounce(
  renderAnnouncementList, onError),
RERENDER_DELAY,
);
setUserFormSubmit();
