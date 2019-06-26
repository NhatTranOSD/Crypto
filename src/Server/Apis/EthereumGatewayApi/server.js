let express = require('express');
let app = express();
const env = require('dotenv');
env.config();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


let routes = require('./routes') //importing route
routes(app)

let port = process.env.PORT || 3000;

app.listen(port);

console.log('RESTful API server started on: ' + port);