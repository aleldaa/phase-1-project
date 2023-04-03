require("dotenv").config()
const express = require('express');
const axios = require('axios')
const app = express()
const apiUrl = "https://imdb-api.com/en/API/Top250Movies/"

app.get('/hello', (req,res)=> {
    res.send("Hello Api")
})
app.get('/data', async(req,res,next)=>{
    axios.request(apiUrl + process.env.API_KEY)
    .then((response) => {
        res.json(response.data)
    })
})
app.listen(3000, ()=> {
    console.log("started")
})
 
// const movieListContainer = document.querySelector('#movie-list-container')
// const movieList = document.querySelector('#movie-list')
// const movie1 = document.querySelector("#movie1")

// movie1.src = data.image