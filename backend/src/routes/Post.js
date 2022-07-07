const { Router } = require('express');
const fs = require('fs');

const router = Router();
const multer = require('multer');
const path = require('path');

// Read the JSON data of the saved files
let rawdata = fs.readFileSync(__dirname + '/filesData.json');
let filesData = JSON.parse(rawdata);

// Get the name of the files uploaded
const getName = (name) => {
  arr = name.split('.')
  name = arr[0].toString()
  extension = arr[arr.length-1].toString()
  return [name, extension]
}

// Save the data of the files in the JSON
const writeJson = file => {
  let id = file.fieldname
  filesData[id] = { 
    name: getName(file.originalname)[0],
    extension: getName(file.originalname)[1]
  }

  const jsonContent = JSON.stringify(filesData, null, 2);
  fs.writeFile(`${__dirname}/filesData.json`, jsonContent, 'utf8', () => {
    console.log("JSON file has been saved.");
  });
}

// Save the files
const storage = multer.diskStorage({
  destination: path.join(__dirname, '/public/uploads'),
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}.${getName(file.originalname)[1]}`)
  }
})

// Configuration for multer
const uploadConfig = multer({
  storage,
  dest: path.join(__dirname, '../public/uploads'),
  limits: {fileSize: 1000000000}
}).any()

// Make the route
router.post('/upload', uploadConfig, (req, res) => {

  writeJson(req.files[0]);

  res.send('uploaded');

})

module.exports = router;