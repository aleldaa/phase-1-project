fetch("http://localhost:3000/items")
.then(response=>response.json())
.then(response=>{
    console.log(response)
    getMovies(response)
})
.catch(err => console.log(err))

let global
const movieList = document.querySelector('#movie-list-container')

const getMovies = (movies) => {
    // for(let i = 0; i < 9; i++){
        movies.forEach(movie => {
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
            let movieStats = document.querySelector('#movie-stats');
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
            movieStats.classList.add('col-6')
            while(movieDetails.firstChild){
                movieDetails.removeChild(movieDetails.lastChild);
            }
            movieStats.append(movieTitle, releaseYear, movieCast, movieRating);
            movieDetails.append(movieImage, movieStats);

        })
    });
}

