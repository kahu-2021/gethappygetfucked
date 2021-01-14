const express = require('express')
const hbs = require('express-handlebars')
const fs = require('fs')
const puppies = require('./data.json')
const routes = require('./routes.js')

const server = express()

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here
server.get('/', (req, res) => {
  res.render('home', puppies)
})

server.get('/addPuppy', (req, res) => {
  res.render('addPuppy', puppies)
})

server.post('/addPuppy', (req, res) => {
  let newPuppy = {
    id : puppies.puppies.length + 1,
    name : req.body.name,
    owner : req.body.owner,
    image : req.body.image,
    breed : req.body.breed,
  }
  puppies.puppies.push(newPuppy)
  fs.writeFile('./data.json', JSON.stringify(puppies, null, 2), (err) => {
    if (err){
      throw err;
    }
    console.log("Your new puppy has been saved.")
  })
  res.redirect('/')
})

server.use('/puppies', routes)
module.exports = server
