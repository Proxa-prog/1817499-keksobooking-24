import {ARRAY_LENGTH} from './utils/arrays-and-variables.js';
import {createAd} from './utils/object-creation-functions.js';
import './utils/similrArannouncement.js';

const createArrayAd = Array.from({length: ARRAY_LENGTH}, createAd);
console.log(createArrayAd[1]);

export {createArrayAd};



