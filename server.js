const express = require('express')
const hbs = require('express-handlebars')
const server = express()
const fs = require('fs')
const data = require('./data.json')
let comp = data.compliments
let insults = data.insults

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
  let name = {name : req.body.name}
  res.render('./questions', name)
})

server.get('/questions', (req, res) => {
  res.send("questions")
})

server.post('/compliment', (req, res) => {
  res.send(comp[Math.floor(Math.random()*comp.length)].comp)
})

server.get('/compliment', (req, res) => {
  res.send(comp[Math.floor(Math.random()*comp.length)].comp)
})

server.get('/insult', (req, res) => {
  res.send(insults[Math.floor(Math.random()*insults.length)].comp)
})

server.post('/insult', (req, res) => {
  res.send(insults[Math.floor(Math.random()*insults.length)].comp)
})





module.exports = server
