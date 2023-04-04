fetch("http://localhost:3000/data")
.then(response=>response.json())
.then(response=>{
    console.log(response)
    getMovies(response)
})
.catch(err => console.log(err))

let global
const movieList = document.querySelector('#movie-list')

const getMovies = (movies) => {
    for(let i = 0; i <= 10; i++){
        let movieCard = document.createElement('li')
        console.log(movieCard)
        let url = movies.items[i].image
        let image = document.createElement('img')
        image.src = url
        movieCard.append(image)
        movieList.append(movieCard)
    }
    
}
