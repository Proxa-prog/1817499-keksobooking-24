import {onError} from './utils/utils.js';
import {setUserFormSubmit} from './form.js';
import {getData} from './api.js';
import {renderAnnouncementList} from './map.js';

// formDeactivation();
getData(renderAnnouncementList, onError);
setUserFormSubmit();
