/**
 * Created by Lenovo on 2018/3/5.
 */
var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var port = process.env.PORT  || 3000;
var dbUrl = 'mongodb://localhost/bang';
var fs = require('fs');

//链接数据库
mongoose.connect(dbUrl);
var db = mongoose.connection;
    db.on('error', function (err) {
    console.log("connect mongodb error", err);
});
db.once('open', function () {
    console.log('链接数据库成功！');
});

// models loading
// 也可以一个一个加载  例:
// var BillModels = require('./app/models/bill');
// var UserModels = require('./app/models/user');
var models_path = __dirname + '/app/admin/models';
var models_www_path = __dirname + '/app/www/models';
var walk = function(path) {
    fs
        .readdirSync(path)
        .forEach(function(file) {
            var newPath = path + '/' + file;
            var stat = fs.statSync(newPath);

            if (stat.isFile()) {
                if (/(.*)\.(js|coffee)/.test(file)) {
                    require(newPath);
                }
            }
            else if (stat.isDirectory()) {
                walk(newPath);
            }
        })
};
walk(models_path);
walk(models_www_path);

// 使用 connect-mongo 模块，保存会话
    app.use(session({
    secret: 'bang',
    store: new MongoStore({
        mongooseConnection: db
    })
}));

app.set("views", "./views"); //模板文件
app.set("view engine", "jade"); //模板引擎
require('./config/admin_routes')(app); // 引入admin路由文件
require('./config/www_routes')(app); // 引入www路由文件
app.listen(port);
app.locals.moment = require('moment');
app.use(express.static(path.join(__dirname, 'public')));//使用静态资源的根路径

console.log("服务创建成功! 访问：localhost:" + port);
