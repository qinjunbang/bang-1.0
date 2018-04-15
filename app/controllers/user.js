/**
 * Created by Lenovo on 2018/3/17.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');
var _ = require('underscore');

exports.user = function (req, res) {
    User.find({}).exec(function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("data", data);
            res.render('user', {
                action: 'index',
                title: '管理员列表',
                data: data
            });
        }
    });
};

exports.edit = function (req, res) {
    var params_id = req.params.id;
    if (params_id && params_id !== '') {
        User.findById(params_id, function (err, user) {
            if (err) {
                console.log(err);
            } else {
                res.render('user', {
                    action: 'edit',
                    title: '编辑用户',
                    data: user
                });
            }
        });
    } else {
        res.render('user', {
            action: 'edit',
            title: '新增用户',
            data: {id: '', name: '', password: '', retype_password: '', status: 0, role: 1}
        });
    }
};

exports.add = function (req, res) {
    var data = req.body;
    if (data.id && data.id !== '') {
        User.findById(data.id, function (err, user) {
            if (err) {
                console.log(err);
                res.json({info: "修改失败！", status: 0, data: err});
            } else {
                if (!data.password || data.password === '') {
                    data.password = user.password;
                }
                var _user = _.extend(user, data);
                _user.save(function (err, user) {
                    if (err) {
                        res.json({info: "修改失败！", status: 0, data: err});
                    } else {
                        res.json({info: "修改成功！", status: 1, data: []});
                    }
                });
            }
        });
    } else {
        var _user = new User(data);
        _user.save(function (err, user) {
            if (err) {
                res.json({info: "添加失败！", status: 0, data: err});
            } else {
                res.json({info: "添加成功！", status: 1, data: []});
            }
        });
    }
};
exports.del = function (req, res) {
    var data = req.body;

    if (data.id && data.id !== '') {
        User.remove({_id: data.id}, function (err, user) {
            if (err) {
                console.log(err);
                res.json({info: "删除失败", status: 0, data: err});
            } else {
                res.json({info: "删除成功！", status: 1, data: []});
            }
        });
    } else {
        res.json({info: "删除失败！", status: 0, data: {id: data.id}});
    }
};