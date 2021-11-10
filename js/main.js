// import {map} from'./map.js';
import {formDeactivation, formActivation, setUserFormSubmit} from './form.js';
import {getData} from './api.js';
import {renderAnnouncementList} from'./map.js';

getData(renderAnnouncementList);
formDeactivation();
formActivation();
setUserFormSubmit();
