import './css/styles.css';
import fetchCountries from './js/fetchCountries';
// import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
    searchBox: document.getElementById('search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

const { searchBox, countryList, countryInfo } = refs;

searchBox.addEventListener('input', onInputSearch);

function onInputSearch(e) {
    const inputSearch = e.currentTarget.value.trim();

    if(inputSearch === '') {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';

    return;
    }

    if(inputSearch) {
        return fetchCountries(inputSearch)
            .then(data => {
                onMarckupRender(data);
            })
            .catch(error => Notify.failure('Oops, there is no country with that name'));
    };
}

function onMarckupRender(countries) {
    if(countries.length > 10) {
        countryList.innerHTML = '';
        return Notify.info('Too many matches found. Please enter a more specific name');
    }

    if(countries.length > 1) {
        const markupList = countries
            .map(({ name, flags }) => 
            `<li>
            <img style="padding-right: 8px" src="${flags.svg}" width="40" />${name}
            </li>`).join('');

        countryList.innerHTML = markupList;
        countryInfo.innerHTML = '';
    }

    if(countries.length === 1) {
        const markupInfo = countries
            .map(({ name, flags, capital, population, languages }) => 
            `<ul>
                <li style="font-size: 32px"><img style="padding-right: 8px" src="${flags.svg}" width="40" /> ${name}</li>
                <li>Capital: <span>${capital}</span></li>
                <li>Population: <span>${population}</span></li>
                <li>Languages: <span>${languages[0].name}</span></li>
            </ul>`).join('');

        countryList.innerHTML = '';
        countryInfo.innerHTML = markupInfo;
    }
}