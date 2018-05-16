/**
 * Created by Lenovo on 2018/5/16.
 */
var Index = require('../app/www/controllers/index');

module.exports = function (app) {
    app.get('/', Index.index);
    app.get('/index', Index.index);
};