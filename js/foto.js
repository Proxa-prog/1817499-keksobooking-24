import {formWindowElement} from './form.js';
import {FILE_TYPES} from './arrays-and-variables.js';

const avatarPreviewElement = formWindowElement.querySelector('.ad-form-header__preview').querySelector('img');
const avatarDowmloadElement = formWindowElement.querySelector('.ad-form__field').querySelector('#avatar');
const fotoDownloadElement = formWindowElement.querySelector('.ad-form__upload').querySelector('#images');
const fotoPreviewElement = formWindowElement.querySelector('.ad-form__photo-container').querySelector('.ad-form__photo');

avatarDowmloadElement.addEventListener('change', () => {
  const file = avatarDowmloadElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((item) => {
    return fileName.endsWith(item);
  });

  if (matches) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
});

console.log(fotoPreviewElement);
fotoDownloadElement.addEventListener('change', () => {
  const file = fotoDownloadElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((item) => {
    return fileName.endsWith(item);
  });

  if (matches) {
    let img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.style.height='200px';
    img.style.width='200px';
    fotoPreviewElement.appendChild(img);
  }
});
