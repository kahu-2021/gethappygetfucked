const server = require("../server")
const request = require("supertest")
const cheerio = require("cheerio")
const puppies = require('../data.json')

test ("tests are running", () => {
  expect(2).toBeGreaterThan(1)
})

test ("/ exists", done => {
  request(server)
  .get("/")
  .end((err, res) => {
      expect(res.status).toBe(200)
      done()
  })
})

test ("there are more than three puppies", done => {
  request(server)
  .get("/")
  .end((err, res) =>{
      const $ = cheerio.load(res.text)
      const actual = $('img').length
      expect(actual).toBeGreaterThan(3)
      done()
  })
})

// test ("adding new puppy makes array one longer", done => {
//   const prevLength = puppies.puppies.length
//   request(server)
//   .get('/addPuppy')
//   .end((err, res) => {
//     const actual = puppies.puppies.length
//     expect(actual).toBeGreaterThan(prevLength)
//     done()
//   })
// })