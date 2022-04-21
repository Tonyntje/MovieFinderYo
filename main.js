let inputs = document.querySelectorAll('input[name=filtertypes]');

// Extra sauce for +smoothness
const loadImage = (element, delay) => { 
    setTimeout(() => {
        element.classList.add('hi');
    }, delay);
}

const addMoviesToDom = movies => {
    let animationDelay = 100;
    let moviesOverview = document.getElementById('movieoverview');
    moviesOverview.innerHTML = '';
    movies
        .map(element => ({imagelink: element.poster, id: element.imdbID}) )
        .forEach(element => {
        let listItem = document.createElement('li')
        let anchorTag = document.createElement('a')
        anchorTag.href = getImdbLink(element.id);
        let image = document.createElement('img')
        image.src = element.imagelink;
        image.setAttribute('data-delay', animationDelay);
        animationDelay += 100;
        listItem.append(anchorTag)
        anchorTag.append(image)
        moviesOverview.append(listItem)
    })

    // Extra Sauce Initiation
    let getImages = document.querySelectorAll('img');
    Array.from(getImages).forEach(element => {
        loadImage(element, element.dataset.delay);
    });
}

const getImdbLink = id => `https://www.imdb.com/title/${id}`;
const filterLatestMovies = () => {
    addMoviesToDom(movies.filter(element => parseInt(element.year) > 2014 ))
}
const filterMovies = wordInMovie => {
    addMoviesToDom(movies.filter(element => element.title.includes(wordInMovie)))
}

const filterStuff = e => {
    switch (e.target.value) {
        case 'newest':
            filterLatestMovies();
            break;
        case 'avengers':
            filterMovies('Avengers')
            break;
        case 'xmen':
            filterMovies('X-Men')
            break;
        case 'princess':
            filterMovies('Princess')
            break;
        case 'batman':
            filterMovies('Batman')
            break;
    }
}

inputs.forEach(element => element.addEventListener('change', filterStuff));
addMoviesToDom(movies);

// For the Search ...
const getToTyping = e => {
    let foundMovies = movies.filter(element => element.title.toLowerCase().includes(e.target.value.toLowerCase()));
    addMoviesToDom(foundMovies);

    // uncheck all radios because search overruling the movies filter with new items. 
    // Making radio check invalid and so uncheckable if want to check again. 
    // This is usability choice. Not sure this is needed for the assignment.
    let radios = document.querySelectorAll('input[type=radio]');
    radios.forEach(element => {
        element.checked = false;
    });
}

let getSearch = document.getElementById('search');
getSearch.addEventListener('keyup', getToTyping);