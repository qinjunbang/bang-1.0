/**
 * Created by Lenovo on 2018/3/5.
 */
var Index = require('../app/controllers/index');
var Bill = require('../app/controllers/bill');
var User = require('../app/controllers/user');
var Article = require('../app/controllers/article');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json(); // create application/json parser
var urlencodedParser = bodyParser.urlencoded({ extended: false }); // create application/x-www-form-urlencoded parser


module.exports = function (app) {
    app.use(function (req, res, next) {
        var userInfo = req.session.userInfo;
        app.locals.userInfo = userInfo;
        next();
    });
    app.get('/', Index.index);
    app.get('/bill', Bill.index);
    app.post('/bill/add', urlencodedParser, Bill.add);
    app.get('/bill/edit/:id', Bill.index.edit);
    app.get('/bill/edit', Bill.index.edit);
    app.post('/bill/del', urlencodedParser, Bill.del);
    app.all('/login', urlencodedParser, Index.login);
    app.get('/logout', Index.logout);
    app.all('/register', urlencodedParser, Index.register);
    app.get('/user/index', User.user);
    app.post('/user/del', urlencodedParser, User.del);
    app.post('/user/add', urlencodedParser, User.add);
    app.get('/user/edit/:id', User.edit);
    app.get('/user/edit', User.edit);
    app.get('/article', Article.index);
    app.get('/article/edit', Article.index.edit);
};

