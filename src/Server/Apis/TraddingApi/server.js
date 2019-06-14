let express = require('express');
let app = express();
const bodyParser = require('body-parser')
const env = require('dotenv')
env.config();

let routes = require('./routes') //importing route
routes(app)

let port = process.env.PORT || 3000;

app.listen(port);

console.log('RESTful API server started on: ' + port);