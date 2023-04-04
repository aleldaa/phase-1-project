fetch("http://localhost:3000/data")
.then(response=>response.json())
.then(response=>console.log(response))
.catch(err => console.log(err))
.then(data => getMovies(data))

let global
const movie1 = document.querySelector('#movie1')

const getMovies = (movies) => {
    movies.forEach(content =>)
}
