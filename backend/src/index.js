const express = require('express');

// Initizations
const app = express();


//settings
app.set('port', 8000)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


//Routes
app.use(require('./routes/Post'))
app.use(require('./routes/Get'))
app.use(require('./routes/Delete'))
app.use('/download', express.static(__dirname + '/routes/public/uploads/'))

//start the server
app.listen(app.get('port'), ()=> {
  console.log(`Server on port ${app.get('port')}`)
})