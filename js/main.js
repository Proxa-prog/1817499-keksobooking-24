import {createNewAnnouncementElement} from './similrArannouncement.js';
import {ARRAY_LENGTH} from './arrays-and-variables.js';
import {createAd} from './object-creation-functions.js';

const createArrayAd = Array.from({length: ARRAY_LENGTH}, createAd);
console.log(createArrayAd[1]);

createNewAnnouncementElement();

export {createArrayAd};
