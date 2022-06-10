const express = require('express')
const serverConfig = require('./app/config/server.config')
const bodyParser = require('body-parser');

const PORT = serverConfig.PORT || 5000

const app = express()

app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  
  });
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
//Routes
app.get('/api',(req,res) => res.status(200).send({message : 'test server'}))



app.listen(PORT,  () => console.log(`Server is running on port ${PORT}`))