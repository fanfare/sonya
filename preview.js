const http = require('http')
const port = '10328'
const fs = require('fs')

const axios = require('axios')
const app = new http.Server()

app.on('request', (req, res) => {
  let method = req.method.toLowerCase()
  let ip = req.remoteAddress
  let url = req.url
  if (method === "get") {
const testFolder = './images/';
var array = []
fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    array.push(file)
  });
  var html = `
    <html>
    <body bgcolor="#${process.argv[2]}">
    <center>
    <br><br<br><br>
  `
  for (let i=0;i<array.length;i++) {
    html += `<img src="http://localhost:99/${array[i]}" width=600><br><br><br><br><br><br><br><br><br><br><Br>`
  }
  html += `</center></body></html>`
  res.end(html)
});   

  }

});

app.listen(port, () => {
  console.log(`listening on port ${port}`)
});