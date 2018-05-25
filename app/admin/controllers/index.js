/**
 * Created by Lenovo on 2018/3/5.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');


exports.index = function (req, res) {
    console.log("userInfo in session:", req.session.userInfo);
    if (!req.session.userInfo){
        res.redirect("./admin/login");
    } else {
        res.render('./admin/pages/index', {
            title: '首页'
        });
    }
};

exports.login = function (req, res) {
    var _user = req.body;

    if (_user.user_name) {
        User.findOne({name: _user.user_name}, function (err, user) {
            if (err) {
                res.json({info: "报错了！", status: 0, data: err});
            }
            if (!user) {
                res.json({info: "用户名或密码错误!", status: 0, data: []});
            }
            if (user.status === 0) {
                res.json({info: "等待超级管理员审核！", status: 0, data: []});
            }
            if (user.status === 2) {
                res.json({info: "审核失败！", status: 0, data: []});
            }
            user.comparePassword(_user.password, function (err, isMatch) {
                if (err) {
                    res.json({info: "报错了！", status: 0, data: err})
                }
                if (isMatch) {
                    req.session.userInfo = user;
                    res.json({info: "登录成功！", status: 1, data: []});
                } else {
                    res.json({info: "用户名或密码错误！", status: 0, data: []});
                }
            });
        });
    } else {
        res.render('./admin/pages/login', {
            title: '登录页面'
        });
    }
};

exports.logout = function (req, res) {
    delete req.session.userInfo;
    res.redirect(".admin/pages/login");
};

exports.register = function (req, res) {
    var _user = req.body;
    if (_user.name) {
        User.findOne({name: _user.name}, function (err, user) {
            if (err) {
                console.log(err);
            }

            if (user) {
                res.json({info: "用户名已经存在", status: 0, data: []});
            } else {
                user = new User(_user);
                user.save(function (err, user) {
                    if (err) {
                        console.log(err);
                        res.json({info: err.errmsg, status: 0, data: []});
                    } else {
                        res.json({info: "注册成功！", status: 1, data: []});
                    }
                });
            }
        });
    } else {
        res.render('./admin/pages/register', {
            title: "注册页面"
        })
    }
};

