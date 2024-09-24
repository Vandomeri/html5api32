const searchBar = document.getElementById('searchBar')
const titleType = document.getElementById('titleType')
const searchResult = document.getElementById('searchResult')


async function searchFilm(prompt) {
    const url = `https://moviesdatabase.p.rapidapi.com/titles/search/akas/${prompt}?titleType=${titleType.value}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'a4e0177fdcmsh003acdd5b629c54p194069jsne7b0ddc29092',
            'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        searchResult.innerHTML = ""
        result.results.forEach((el) => {
            searchResult.innerHTML += `<div><img src="${el.primaryImage?.url}" alt="" > <p>${el.titleText.text}</p></div>`
        })
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}


searchBar.addEventListener('change', (e) => {
    searchFilm(e.target.value)
})