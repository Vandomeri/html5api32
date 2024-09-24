const filmList = document.getElementById('filmList')
const prevPage = document.getElementById('prevPage')
const nextPage = document.getElementById('nextPage')

let page = 1

async function getTitles(page) {
    const url = `https://moviesdatabase.p.rapidapi.com/titles?page=${page}`;
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
        console.log(result);
        filmList.innerHTML = ""
        result.results.forEach((el) => {
            filmList.innerHTML += `<div><img src="${el.primaryImage?.url}" alt="" > <p>${el.titleText.text}</p></div>`
        })

    } catch (error) {
        console.error(error);
    }
}

getTitles(page)


prevPage.addEventListener('click', () => {
    if (page !== 1) {
        page--
        getTitles(page)
    }
})

nextPage.addEventListener('click', () => {
    page++
    getTitles(page)
})