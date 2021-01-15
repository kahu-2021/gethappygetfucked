const express = require('express')
const hbs = require('express-handlebars')
const server = express()
const fs = require('fs')
const data = require('./data.json')
let comp = data.compliments
let insults = data.insults
let name = data.name

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here

server.get('/', (req, res) => {
  res.render('./home')
})

server.post('/questions', (req, res) => {
  console.log('POST /questions')
  let n = {name : req.body.name}
  data.name = n
  fs.writeFile('./data.json', JSON.stringify(data, null, 2), (err) => {
    if (err){
      throw err
    }
    console.log("name changed")
  })
  res.render('./questions', n)
})

server.get('/questions', (req, res) => {
  console.log('GET /questions')

  res.send("questions")
})

server.post('/compliment', (req, res) => {
  console.log('POST /compliment')
  let newData = {}
  fs.readFile('./data.json', (err, d) => {
    if (err){
      throw err
    }else{
      newData = JSON.parse(d)
    }
    let pageData = {
      compliment : comp[Math.floor(Math.random()*comp.length)],
      name : newData.name
    }
    console.log(pageData.name)
    res.render('./compliment', pageData)
  })
})

server.get('/compliment', (req, res) => {
  console.log('GET /compliment')

  let pageData = {
    compliment : comp[Math.floor(Math.random()*comp.length)],
    name : name
  }
  res.render('./compliment', pageData)
})

server.get('/insult', (req, res) => {
  let pageData = {
    insult : insults[Math.floor(Math.random()*insults.length)],
    name : name
  }
  res.render('./insult', pageData)
})

server.post('/insult', (req, res) => {
  let newData = {}
  fs.readFile('./data.json', (err, d) => {
    if (err){
      throw err
    }else{
      newData = JSON.parse(d)
    }
    let pageData = {
      insult : insults[Math.floor(Math.random()*comp.length)],
      name : newData.name
    }
    console.log(pageData.name)
    res.render('./insult', pageData)
  })
})

module.exports = server
