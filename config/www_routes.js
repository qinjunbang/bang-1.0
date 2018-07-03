/**
 * Created by Lenovo on 2018/5/16.
 */
var Index = require('../app/www/controllers/index');
var About = require('../app/www/controllers/about');
var ArticleList = require('../app/www/controllers/article');
var Works = require('../app/www/controllers/works');
var Message = require('../app/www/controllers/message');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app) {
    app.use(function (req, res, next) {
        var memberInfo = req.session.memberInfo;
        app.locals.memberInfo = memberInfo;
        next();
    });
    app.get('/', Index.index);
    app.get('/index', Index.index);
    app.get('/about', About.index);
    app.get('/articleList', ArticleList.index);
    app.get('/articleList/Detail/:id', ArticleList.index.detail);
    app.get('/works', Works.index);
    app.get('/message', Message.index);
    app.all('/login', urlencodedParser, Index.login);
    app.all('/register', urlencodedParser, Index.register);
    app.get('/logout', Index.logout);
    app.post('/message/add', urlencodedParser, Message.add);
    app.post('/message/select', urlencodedParser, Message.select);
};