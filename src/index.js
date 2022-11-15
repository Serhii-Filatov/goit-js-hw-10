import './css/styles.css';
const debounce = require('lodash.debounce'); 
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import fetchContries from '../src/fetchCountries.js';
import countryCard from '../src/template/country-card.js';
import countryList from '../src/template/country-list.js';

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
}

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(findCountry, DEBOUNCE_DELAY));

function findCountry(event) {
    let name = event.target.value;
    name = name.trim();

    fetchContries(name).then(response => {
        return response;
    })
    .then(result => {
        clearPage();

        if (result.length === 1) {
            const country = {
                name: result[0].name.official,
                flag: result[0].flags.svg,
                capital: result[0].capital,
                population: result[0].population,
                languages: Object.values(result[0].languages).join(', '),
            }

            refs.info.insertAdjacentHTML('beforeend', countryCard(country));
        }

        if (result.length > 2 && result.length <= 10) {
            const markup = result.map(item => {
                const country = {
                    name: item.name.official,
                    flag: item.flags.svg,                
                }               

                return countryList(country);                
            }).join('');
        
            refs.list.insertAdjacentHTML('beforeend', markup);
        }
        
        if (result.length > 10) {
            Notify.info('Too many matches found. Please enter a more specific name.');
        }
    })
    .catch(error => {
        clearPage()
        Notify.failure('Oops, there is no country with that name.');
        Notify.failure(`${error}`);
    });
}

function clearPage() {
    refs.list.innerHTML = ""
    refs.info.innerHTML = ""
}