const http = require('http')
const port = '10588'
const fs = require('fs')
if (!fs.existsSync('./images/')) {
  fs.mkdirSync('./images/')
}
const axios = require('axios')
const app = new http.Server()

app.on('request', (req, res) => {
  let method = req.method.toLowerCase()
  let ip = req.remoteAddress
  let url = req.url
  if (method === "post" && url === "/save") {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
      try {
        var blob = JSON.parse(body)
        axios({
          method: "get",
          url: blob.url,
          responseType: "stream"
        }).then(function (response) {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.end('ok')
          response.data.pipe(fs.createWriteStream(`./images/${blob.file}.jpg`));
        })
      }
      catch(e) {
        console.error("prob")
      }
    })
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`)
});