const { Router } = require('express');
const fs = require('fs');

const router = Router();

let rawdata = fs.readFileSync(__dirname + '/filesData.json');
let filesData = JSON.parse(rawdata);

const filesPath = __dirname + '/public/uploads/'
let url = ''

const changeName = id => {
  for (let file in filesData) {
    if (filesData[id] == filesData[file]){
      fs.rename(`${filesPath}${id}.${filesData[id].extension}`, `${filesPath}${filesData[id].name}.${filesData[id].extension}`, () => {
        console.log('')
      })
      url = `${filesData[id].name}.${filesData[id].extension}`
    }
  }
} 


router.get('/get/:id', async (req, res) => {

  changeName(req.params.id)
  res.send(await {
    url: 'http://localhost:8000/download/' + url,
    name: url
  })
})

module.exports = router;