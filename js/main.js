import {ARRAY_LENGTH} from './utils/arrays-and-variables.js';
import {createAd} from './utils/object-creation-functions.js';

const createArrayAd = Array.from({length: ARRAY_LENGTH}, createAd);
createArrayAd[1];
