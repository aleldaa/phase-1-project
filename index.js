fetch("http://localhost:3000/items")
.then(response=>response.json())
.then(response=>{
    console.log(response)
    getMovies(response)
})
.catch(err => console.log(err))

const movieList = document.querySelector('#movie-list-container')
const submitForm = document.querySelector('.col-3')
const imageLink =document.querySelector('#image-link')
const yearInput = document.querySelector('#year')
const castInput = document.querySelector('#cast')
const rating = document.querySelector('#rating')
const button = document.querySelector('#button')

const getMovies = (movies) => {
        movies.forEach(movie => {
        movieBox(movie)
    });
}

const movieBox = (movie) => {
    let movieCard = document.createElement('li')
    movieCard.classList.add('col-4')
    let url = movie.image
    let image = document.createElement('img')
    image.src = url
    movieCard.append(image)
    movieList.append(movieCard)

    movieCard.addEventListener('mouseover', () => {
    movieCard.style.transform = "scale(1.5)";
    });
    movieCard.addEventListener( 'mouseout', () => {
    movieCard.style.transform = "scale(1)";
    })
    movieCard.addEventListener('click', () => {
    let movieDetails = document.querySelector('#movie-details');
    let movieTitle = document.createElement('p');
    let releaseYear = document.createElement('p');
    let movieCast = document.createElement('p');
    let movieRating = document.createElement('p');
    let movieImage = document.createElement('img');

    movieImage.src = movie.image
    movieTitle.textContent = movie.title;
    releaseYear.textContent = movie.year;
    movieCast.textContent = `Main Cast: ${movie.crew}`;
    movieRating.textContent = `imDb Rating: ${movie.imDbRating}`;
    while(movieDetails.firstChild){
    movieDetails.removeChild(movieDetails.lastChild);
    }
    movieDetails.append(movieImage, movieTitle, releaseYear, movieCast, movieRating);
    })
}

submitForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const newImage = document.createElement('img')

    let newMovie = {
            "title": e.target.title.value,
            "year":  e.target.year.value,
            "image": e.target['image-link'].value,
            "crew": e.target.cast.value,
            "imDbRating": e.target.rating.value
    }
    movieBox(newMovie)
    e.target.reset()
})