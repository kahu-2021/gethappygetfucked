const express = require('express')
const { route } = require('./server')
const routes = express.Router()
const puppies = require('./data.json')
const fs = require('fs')
module.exports = routes

routes.get('/:id/edit', (req,res) => {
  let id = req.params.id
  let puppy = puppies.puppies.find(element => element.id == id)
  res.render('edit', puppy)
})
routes.post('/:id/edit', (req,res) => {
  let id = req.params.id
  let puppy = puppies.puppies.find(element => element.id == id)
  puppy.name = req.body.name
  puppy.breed = req.body.breed
  puppy.owner = req.body.owner
  fs.writeFile('./data.json', JSON.stringify(puppies, null, 2), (err) => {
    if (err){
      throw err;
    }
    console.log("Your edits have been saved.")
  })
  res.redirect(`/puppies/${id}`)
})

routes.get('/:id',(req, res) => {
  let id = req.params.id
  let puppy = puppies.puppies.find(element => element.id == id)
  res.render('details', puppy)
})
