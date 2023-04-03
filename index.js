// import axios from 'axios'
// import express from 'express'
require("dotenv").config()
const express = require('express');
const axios = require('axios')
const app = express()
const apiUrl = "https://imdb-api.com/en/API/Top250Movies/"
console.log(process.env.API_KEY)
app.get('/hello', (req,res)=> {
    res.send("Hello Api")
})
app.get('/data', async(req,res,next)=>{
    console.log("Hello")
    axios.get(apiUrl + process.env.API_KEY)
    .then((response) => {
        console.log(res.json(response.data))
    })
})
app.listen(3000, ()=> {
    console.log("started")
})