import './css/styles.css';
import fetchCountries from './js/fetchCountries';
// import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// console.log(fetchCountries);

const DEBOUNCE_DELAY = 300;

const refs = {
    searchBox: document.getElementById('search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

const {searchBox, countryList, countryInfo} = refs;

searchBox.addEventListener('input', onInputSearch);

let name = 'swit';


function onInputSearch(e) {
    const inputSearch = e.currentTarget.value.trim();
    console.dir(inputSearch);

    if(inputSearch === '') {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';

    return;
    }

    if(inputSearch) {
        return fetchCountries(inputSearch)
            .then(data => {
                onMarckupRender(data);
                console.log(data);
                console.log(data.length);
            })
            .catch(Notify.failure('Oops, there is no country with that name'));
    };
}

// Fetch Data
// fetch(url)
//     .then(response => response.json())
//     .then(console.log)

// fetchCountries(name) {
// }

function onMarckupRender(countries) {
    if(countries.length > 10) {
        return Notify.info('Too many matches found. Please enter a more specific name');
        console.log('We found mote ten countries');
    }

    if(countries.length > 1) {
        console.log('We found 2-10 countries');

        const markup = countries
            .map(({name, flags}) => 
            `<li>
                <img src="${flags.svg}"><span>${name.official}</span>
            </li>`).join();

        console.log(markup);
    }

    if(countries.length === 1) {
        console.log('We found One countie');
    }

    if(countries.length === 0) {
        console.log('Ops, we dont finde nothin, please try again');
    }


}