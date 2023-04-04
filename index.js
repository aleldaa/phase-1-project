// import axios from 'axios'
// import express from 'express'
// require("dotenv").config()
// const express = require('express');
// const axios = require('axios')
// const app = express()
// const apiUrl = "https://imdb-api.com/en/API/Top250Movies/"
// console.log(process.env.API_KEY)
// app.get('/hello', (req,res)=> {
//     res.send("Hello Api")
// })
// app.get('/data', async(req,res,next)=>{
//     const options = {
//         method: "GET",
//         url: `${apiUrl + process.env.API_KEY}`,
//         headers: {
//          "Content-Type": "application/json",
//         },
//        }
//     axios.request(options)
//     .then((response) => {
//         res.json(response.data)
//     })
// })
// app.listen(3000, ()=> {
//     console.log("started")
// })

fetch("http://localhost:3000/data")
.then(response=>response.json())
.then(response=>console.log(response))
.catch(err => console.log(err))