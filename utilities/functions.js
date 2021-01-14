function random-compliment(comp){

  return comp[Math.floor(Math.random()*comp.length)]
}
console.log

function comp(callback) {
  fs.readFile("./data.json", "utf8", (err, data) => {
    if (err) {
      console.log("ERROR", err)
    } else {
      comp = JSON.parse(data)
      callback(comp)
    }
  })
}