/**
 * Created by Lenovo on 2018/3/5.
 */
var mongoose = require('mongoose');
var Member = mongoose.model('Member');


exports.index = function (req, res) {
    // console.log("userInfo in session:", req.session.userInfo);
    // if (!req.session.userInfo){
    //     res.redirect("/login");
    // } else {
    //     res.render('index', {
    //         title: '首页'
    //     });
    // }
    res.render('./www/pages/index', {
        title: '首页'
    });
};

exports.login = function (req, res) {
    var _member = req.body;
    console.log("_member", _member);
    if (_member.name) {
        Member.findOne({name: _member.name}, function (err, member) {
            if (err) {
                res.json({info: "报错了！", status: 0, data: err});
            }
            if (!member) {
                res.json({info: "用户名或密码错误!", status: 0, data: []});
            }

            member.comparePassword(_member.password, function (err, isMatch) {
                if (err) {
                    res.json({info: "报错了！", status: 0, data: err})
                }
                if (isMatch) {
                    req.session.memberInfo = member;
                    res.json({info: "登录成功！", status: 1, data: []});
                } else {
                    res.json({info: "用户名或密码错误！", status: 0, data: []});
                }
            });
        });
    } else {
        res.render('./www/pages/login', {
            title: '登录页面'
        });
    }
};

exports.logout = function (req, res) {
    delete req.session.memberInfo;
    res.redirect("/login");
};

exports.register = function (req, res) {
    var _member = req.body;
    if (_member.name) {
        Member.findOne({name: _member.name}, function (err, member) {
            if (err) {
                console.log(err);
            }

            if (member) {
                res.json({info: "用户名已经存在", status: 0, data: []});
            } else {
                member = new Member(_member);
                member.save(function (err, member) {
                    if (err) {
                        console.log(err);
                        res.json({info: err.errmsg, status: 0, data: [member]});
                    } else {
                        res.json({info: "注册成功！", status: 1, data: [member]});
                    }
                });
            }
        });
    } else {
        res.render('./www/pages/register', {
            title: "注册页面"
        })
    }
};

