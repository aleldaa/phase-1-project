// const e = require("express")

fetch("http://localhost:3000/items")
.then(response=>response.json())
.then(response=>{
    console.log(response)
    getMovies(response)
})
.catch(err => console.log(err))

const toggler = document.querySelector('#toggle-label')
const body = document.querySelector('body')
let movieDetails = document.querySelector('#movie-details');


toggler.addEventListener('click', (e) => {

    console.log(e.target.checked)
    if(e.target.checked){
        body.classList.toggle('light-mode')
        movieDetails.classList.toggle('light-mode')
        movieDetails.style.backgroundColor = '#FFF'
    }
    else{
        body.classList.remove('light-mode')
        movieDetails.classList.remove('light-mode')
        movieDetails.style.backgroundColor = '#777777'
    }
})

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
    let featureHeader = document.createElement('h2')
    let i = 0
 

    movieImage.src = movie.image
    movieTitle.textContent = movie.title;
    releaseYear.textContent = `Year Released: ${movie.year}`;
    movieCast.textContent = `Main Cast: ${movie.crew}`;
    movieRating.textContent = `imDb Rating: ${movie.imDbRating}`;
    movieStats.classList.add('col-6');
    upVote.innerHTML = `<i class="fa-solid fa-angles-up"></i>    `
    downVote.innerHTML = `    <i class="fa-solid fa-angles-down"></i>`
    totalCount.textContent = movie.voteRating
    rateContainer.textContent = `Filminator Rating: `
    featureHeader.textContent = 'Now Featuring'
    rateContainer.append(upVote, totalCount, downVote)
  

    while(movieDetails.firstChild){
        movieDetails.removeChild(movieDetails.lastChild);
    }
    while(movieStats.firstChild){
     movieStats.removeChild(movieStats.lastChild);
    }
  
    movieStats.append(movieTitle, releaseYear, movieCast, movieRating, rateContainer);
    movieDetails.append(featureHeader, movieImage, movieStats);

    upVote.addEventListener('click', () => {
        i++
        totalCount.textContent = i
        fetch(`http://localhost:3000/items/${movie.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                'voteRating': i
            })
         })
        
     });
     downVote.addEventListener('click', () => {
        i--;
        totalCount.textContent = i
        fetch(`http://localhost:3000/items/${movie.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                'voteRating': i
            })
        })
    }); 

    movieImage.addEventListener('click', () => {
        movieStats.innerHTML = '';
        movieDetails.removeChild(featureHeader);
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
    movieCard.style.transform = "scale(1.1)";
    movieCard.style.transition = "ease-in-out 0.5s";
    });
    movieCard.addEventListener( 'mouseout', () => {
    movieCard.style.transform = "scale(1)";
    movieCard.style.transition = "ease-in-out 0.5s";
    })
    movieCard.addEventListener('click', () => showMovieDetails(movie));

}

submitForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    let newMovie = {
            "title": e.target.title.value,
            "year":  e.target.year.value,
            "image": e.target['image-link'].value,
            "crew": e.target.cast.value,
            "imDbRating": e.target.rating.value,
            "voteRating": 0
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

