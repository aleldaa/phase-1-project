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
        });
        
    // }
}
