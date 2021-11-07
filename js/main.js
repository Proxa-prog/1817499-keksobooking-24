import {map} from'./map.js';
import {formDeactivation, formActivation} from './form.js';
import {createLoader} from './load.js';
import {getData} from './api.js';

const loadAdvert = createLoader();

getData();
loadAdvert();
formDeactivation();
map.whenReady(formActivation());
// setUserFormSubmit();
