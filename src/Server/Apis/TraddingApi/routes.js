'use strict';

// For Auth
let authMiddleware = require('./common/authmiddleware');

module.exports = function(app) {
    let valuesCtrl = require('./controllers/ValuesController');
    let accountCrl = require('./controllers/AccountController');

    // ValuesController Apis
    // app.get('/', authMiddleware.checkToken, valuesCtrl.get);

    // AccountController Apis
    app.get('/', authMiddleware.checkToken, accountCrl.createAccount);
};