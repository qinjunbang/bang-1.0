/**
 * Created by Lenovo on 2018/5/16.
 */
var Index = require('../app/www/controllers/index');
var About = require('../app/www/controllers/about');
var ArticleList = require('../app/www/controllers/articleList');
var Works = require('../app/www/controllers/works');
var Message = require('../app/www/controllers/message');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app) {
    app.get('/', Index.index);
    app.get('/index', Index.index);
    app.get('/about', About.index);
    app.get('/articleList', ArticleList.index);
    app.get('/works', Works.index);
    app.get('/message', Message.index);
    app.all('/login', urlencodedParser, Index.login);
};