/**
 * Created by Lenovo on 2018/3/5.
 */
var Index = require('../app/controllers/index');
var Bill = require('../app/controllers/bill');
var User = require('../app/controllers/user');
var Article = require('../app/controllers/article');
var bodyParser = require('body-parser');
var moment = require('moment');
//引入图片上传模块
var formidable = require('formidable');
var fs = require('fs');
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
    app.get('/article/edit/:id', Article.index.edit);
    app.post('/article/add', urlencodedParser, Article.index.add);
    app.post('/article/del', urlencodedParser, Article.index.del);

    //上传图片
    app.post('/imagesUpload', function (req, res, next) {
        var form = formidable.IncomingForm();

        form.encoding = "utf-8";
        form.uploadDir = "./public/uploads/";
        form.keepExtensions = true;
        form.maxFiledsSize = 1 * 1024 *1024;

        form.parse(req, function (err, fields, files) {

            if (err) {
                return res.json({
                    status: 0,
                    err: err,
                    info: "上传出错!"
                });
            }

            if (files.img.size > form.maxFiledsSize) {
                fs.unlink(files.img.path);
                return res.json({
                    status: 0,
                    err: 401,
                    info: "图片应小于2M"
                });
            }

            var extName = ''; //后缀名
            switch (files.img.type) {
                case 'image/pjpeg':
                    extName = 'jpg';
                    break;
                case 'image/jpeg':
                    extName = 'jpg';
                    break;
                case 'image/png':
                    extName = 'png';
                    break;
                case 'image/x-png':
                    extName = 'png';
                    break;
            }

            if (extName.length == 0) {
                return res.json({
                    err: 404,
                    info: "只支持png和jpg格式图片"
                });
            }


            //生成时间戳
            var timestamp = Date.now();

            //生成随机数
            var ran = parseInt(Math.random() * 8999 + 10000);

            // 生成新图片名称
            var imageName = timestamp + ran + '.' + extName;

            timestamp = moment(timestamp).format("YYYY-MM-DD");

            // 新图片路径
            var newPath = form.uploadDir + timestamp + "/" + imageName;

            // 创建文件夹
            fs.exists(form.uploadDir + timestamp, function (hasDir) {
                if(!hasDir) {
                    fs.mkdirSync(form.uploadDir + timestamp);
                }

                // 更改名字和路径
                fs.rename(files.img.path, newPath, function (err) {
                    if (err) {
                        console.log("err", err);
                        return res.json({
                            status: 0,
                            err: 401,
                            info: "图片上传失败"
                        });
                    }
                    return res.json({
                        status: 1,
                        info: "上传成功",
                        data: {
                            url:"/uploads/" + timestamp  + "/" + imageName,
                            name: imageName
                        }
                    });
                });
            });


        });

    })
};

