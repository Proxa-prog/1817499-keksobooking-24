import {formWindowElement} from './form.js';
import {FILE_TYPES} from './arrays-and-variables.js';

const avatarPreviewElement = formWindowElement.querySelector('.ad-form-header__preview').querySelector('img');
const avatarDowmloadElement = formWindowElement.querySelector('.ad-form__field').querySelector('#avatar');
const photoDownloadElement = formWindowElement.querySelector('.ad-form__upload').querySelector('#images');
const photoPreviewElement = formWindowElement.querySelector('.ad-form__photo-container').querySelector('.ad-form__photo');

avatarDowmloadElement.addEventListener('change', () => {
  const file = avatarDowmloadElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));
  if (matches) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
});

photoDownloadElement.addEventListener('change', () => {
  const file = photoDownloadElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.style.height='200px';
    img.style.width='200px';
    photoPreviewElement.appendChild(img);
  }
});
