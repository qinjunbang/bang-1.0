/**
 * Created by Lenovo on 2018/3/5.
 */
var Index = require('../app/admin/controllers/index');
var Bill = require('../app/admin/controllers/bill');
var User = require('../app/admin/controllers/user');
var Article = require('../app/admin/controllers/article');
var Member = require('../app/admin/controllers/Member');

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
        var memberInfo = req.session.memberInfo;
        app.locals.userInfo = userInfo;
        app.locals.memberInfo = memberInfo;
        next();
    });
    app.get('/admin', Index.index);
    app.get('/admin/bill', Bill.index);
    app.post('/admin/bill/add', urlencodedParser, Bill.add);
    app.get('/admin/bill/edit/:id', Bill.index.edit);
    app.get('/admin/bill/edit', Bill.index.edit);
    app.post('/admin/bill/del', urlencodedParser, Bill.del);
    app.all('/admin/login', urlencodedParser, Index.login);
    app.get('/admin/logout', Index.logout);
    app.all('/admin/register', urlencodedParser, Index.register);
    app.get('/admin/user/index', User.user);
    app.post('/admin/user/del', urlencodedParser, User.del);
    app.post('/admin/user/add', urlencodedParser, User.add);
    app.get('/admin/user/edit/:id', User.edit);
    app.get('/admin/user/edit', User.edit);
    app.get('/admin/article', Article.index);
    app.get('/admin/article/edit', Article.index.edit);
    app.get('/admin/article/edit/:id', Article.index.edit);
    app.post('/admin/article/add', urlencodedParser, Article.index.add);
    app.post('/admin/article/del', urlencodedParser, Article.index.del);
    app.get('/admin/member/index', Member.index);
    app.post('/admin/member/del', urlencodedParser, Member.del);
    app.post('/admin/member/add', urlencodedParser, Member.add);
    app.get('/admin/member/edit/:id', Member.edit);
    app.get('/admin/member/edit', Member.edit);


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

