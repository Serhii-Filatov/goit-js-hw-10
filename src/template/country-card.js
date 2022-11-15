export default function countryCard(country) {
    const {flag, name, capital, population, languages} = country;

    return `<div class="country-card">
                <div class="title">
                    <img class="flag" src="${ flag }" alt="${ name } min-width="40" height="30"">
                        <h1 class="name">${ name }</h1>
                </div>                                    
                <ul class="description-list">
                    <li><span class="capital">capital:   ${ capital }</span></li>
                    <li><span class="population">population:   ${ population }</span></li>
                    <li><span class="languages">languages:   ${ languages }</span></li>
                </ul>
            </div>`;
}