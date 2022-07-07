const { Router } = require('express');
const fs = require('fs');

const router = Router();

const filesPath = __dirname + '/public/uploads/'

// Deleting the files
const deleteFile = name => {
  completePath = (filesPath + name).toString()
  console.log(completePath)
  fs.unlink(completePath, (e) => {
    console.log(e)
  })
}

// Make the route
router.delete('/delete/:name', async (req, res) => {

  deleteFile(req.params.name);

  res.send({ status: 'deleted' });
})

module.exports = router;