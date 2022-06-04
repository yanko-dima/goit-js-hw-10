import './css/styles.css';
// import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
    searchBox: document.getElementById('search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

const {searchBox, countryList, countryInfo} = refs;

searchBox.addEventListener('input', onInputSearch);

let name = 'united';

// Feth URL
const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;

// ?fields=name.official,capital,population,flags.svg,languages

function onInputSearch(e) {
    // name = e.currentTarget.value;
    console.dir(e.currentTarget.value);
}

// Fetch Data
fetch(url)
    .then(response => response.json())
    .then(console.log)

// fetchCountries(name) {
// }