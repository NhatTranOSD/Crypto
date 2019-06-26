'use strict';

// For Auth
let authMiddleware = require('./common/authmiddleware');

module.exports = function(app) {

    let valuesCtrl = require('./controllers/ValuesController');
    let accountCrl = require('./controllers/v1/Web3Controller');

    // ValuesController Apis
    app.get('/', authMiddleware.checkToken, valuesCtrl.get);

    // AccountController Apis
    app.get('/createAccount', authMiddleware.checkToken, accountCrl.createAccount);
    app.get('/sendETHTransaction', authMiddleware.checkToken, accountCrl.sendETHTransaction);
    app.get('/sendToken', authMiddleware.checkToken, accountCrl.sendToken);
};