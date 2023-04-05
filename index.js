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

function showMovieDetails(movie) {
    let movieDetails = document.querySelector('#movie-details');
    let movieStats = document.querySelector('#movie-stats');
    let movieTitle = document.createElement('p');
    let releaseYear = document.createElement('p');
    let movieCast = document.createElement('p');
    let movieRating = document.createElement('p');
    let movieImage = document.createElement('img');
    let rateContainer = document.createElement('p');
    let upVote = document.createElement('span')
    let downVote = document.createElement('span')
    let totalCount = document.createElement('span')
    let i = 0
 

    movieImage.src = movie.image
    movieTitle.textContent = movie.title;
    releaseYear.textContent = movie.year;
    movieCast.textContent = `Main Cast: ${movie.crew}`;
    movieRating.textContent = `imDb Rating: ${movie.imDbRating}`;
    movieStats.classList.add('col-6');
    upVote.innerHTML = `<i class="fa-solid fa-angles-up"></i>    `
    downVote.innerHTML = `    <i class="fa-solid fa-angles-down"></i>`
    totalCount.textContent = i
    rateContainer.textContent = `Filminator Rating: `
    rateContainer.append(upVote, totalCount, downVote)
  

    while(movieDetails.firstChild){
        movieDetails.removeChild(movieDetails.lastChild);
    }
    while(movieStats.firstChild){
     movieStats.removeChild(movieStats.lastChild);
    }
  
    movieStats.append(movieTitle, releaseYear, movieCast, movieRating, rateContainer);
    movieDetails.append(movieImage, movieStats);

    upVote.addEventListener('click', () => {
        i++
        totalCount.textContent = i
        
     });
     downVote.addEventListener('click', () => {
        i--;
        totalCount.textContent = i
    }); 

    movieImage.addEventListener('click', () => {
        movieStats.innerHTML = '';
        movieDetails.removeChild(movieImage);
    })

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
    movieCard.addEventListener('click', () => showMovieDetails(movie));

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
    
    fetch("http://localhost:3000/items", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMovie)
    })
    e.target.reset()
})

