'use strict';

// For Auth
let authMiddleware = require('./common/authmiddleware');

module.exports = function(app) {
    let valuesCtrl = require('./controllers/ValuesController');

    app.get('/', authMiddleware.checkToken, valuesCtrl.get);
};