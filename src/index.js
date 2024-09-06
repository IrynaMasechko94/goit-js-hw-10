import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
const select = document.querySelector('.breed-select');

select.addEventListener('change', setOutput);

function setOutput(event) {
  const selectedOptionValue = event.currentTarget.value;
  fetchCatByBreed(selectedOptionValue);
}

fetchBreeds();
