import axios from 'axios';
const loader = document.querySelector('p.loader');
const div = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');
const errorMessage = document.querySelector('p.error');

axios.defaults.headers.common['x-api-key'] =
  'live_5YCaY2SQAPtmjOBkM0QGCZh2YjYqIa7OgaR4GjeU1QfCOLdSPSAhlnCgNYLjomEP';

export function fetchBreeds() {
  loader.style.display = 'block';
  select.style.display = 'none';

  axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(function (response) {
      const select = document.querySelector('.breed-select');
      const markup = response.data
        .map(cat => `<option value=${cat.id}>${cat.name}</option>`)
        .join('');

      select.insertAdjacentHTML('afterbegin', markup);
      select.style.display = 'block';

      // console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
      errorMessage.style.display = 'block';
    })
    .finally(() => {
      loader.style.display = 'none';
    });
}

export function fetchCatByBreed(breedId) {
  loader.style.display = 'block';

  axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(function (response) {
      const breed = response.data[0].breeds[0];

      const htmlString = `<img src=${response.data[0].url} alt="" width="450" height="350">
      <div><h1>${breed.name}</h1>
           <h3>${breed.temperament}</h3>
           <h3>${breed.description}</h3></div>
           `;

      div.innerHTML = htmlString;

      // console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
      errorMessage.style.display = 'block';
    })
    .finally(() => {
      loader.style.display = 'none';
    });
}
