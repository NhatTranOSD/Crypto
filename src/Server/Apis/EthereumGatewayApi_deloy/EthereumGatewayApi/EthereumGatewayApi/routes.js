'use strict';

// For Auth
let authMiddleware = require('./common/authmiddleware');

module.exports = function(app) {

    let valuesCtrl = require('./controllers/ValuesController');
    let accountCrl = require('./controllers/v1/AccountController');

    // ValuesController Apis
    app.get('/', authMiddleware.checkToken, valuesCtrl.get);

    // AccountController Apis
    app.post('/createAccount', authMiddleware.checkToken, accountCrl.createAccount);
    app.post('/sendSignedTransaction', authMiddleware.checkToken, accountCrl.sendSignedTransaction);
};