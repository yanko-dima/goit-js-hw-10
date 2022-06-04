export default function fetchCountries(name) {
// Feth URL
const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;

// Fetch Data
return fetch(url)
    .then(response => response.json());
};

    // .then(response => {
    //     if(!response.ok) {
    //         throw new Error(response.status);
    //     }

    //     response.json();
    // });
