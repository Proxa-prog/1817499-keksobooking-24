import {createNewAnnouncementElement} from './similrArannouncement.js';
import {ARRAY_LENGTH} from './arrays-and-variables.js';
import {createAd} from './object-creation-functions.js';
import {formDeactivation, forActivation} from './form.js';

formDeactivation();
forActivation();
const createArrayAd = Array.from({length: ARRAY_LENGTH}, createAd);
createNewAnnouncementElement(createArrayAd[0]);


