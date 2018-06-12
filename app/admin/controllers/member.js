/**
 * Created by Lenovo on 2018/5/27.
 */
var mongoose = require('mongoose');
var Member = mongoose.model('Member');
var _ = require('underscore');
var Attachment = require('../../../utils/Attachment');


exports.index = function (req, res) {
    Member.find({}).exec(function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("data", data);
            res.render('./admin/pages/member', {
                action: 'index',
                title: '会员列表',
                data: data
            });
        }
    });
};

exports.edit = function (req, res) {
    var params_id = req.params.id;
    if (params_id && params_id !== '') {
        Member.findById(params_id, function (err, user) {
            if (err) {
                console.log(err);
            } else {
                res.render('./admin/pages/member', {
                    action: 'edit',
                    title: '编辑用户',
                    data: user
                });
            }
        });
    } else {
        res.render('./admin/pages/member', {
            action: 'edit',
            title: '新增用户',
            data: {id: '', name: '', password: '', retype_password: '', status: 0, role: 1}
        });
    }
};

exports.add = function (req, res) {
    var data = req.body;
    if (data.id && data.id !== '') {
        Member.findById(data.id, function (err, member) {
            if (err) {
                console.log(err);
                res.json({info: "修改失败！", status: 0, data: err});
            } else {
                if (!data.password || data.password === '') {
                    data.password = member.password;
                }
                var _member = _.extend(member, data);
                _member.save(function (err, member) {
                    if (err) {
                        res.json({info: "修改失败！", status: 0, data: err});
                    } else {
                        res.json({info: "修改成功！", status: 1, data: []});
                    }
                });
            }
        });
    } else {
        var _member = new Member(data);
        _member.save(function (err, member) {
            if (err) {
                res.json({info: "添加失败！", status: 0, data: err});
            } else {
                res.json({info: "添加成功！", status: 1, data: [member]});
            }
        });
    }
};
exports.del = function (req, res) {
    var data = req.body;

    if (data.id && data.id !== '') {
        Member.remove({_id: data.id}, function (err, member) {
            if (err) {
                console.log(err);
                res.json({info: "删除失败", status: 0, data: err});
            } else {
                res.json({info: "删除成功！", status: 1, data: [member]});
            }
        });
    } else {
        res.json({info: "删除失败！", status: 0, data: {id: data.id}});
    }
};
exports.uploadImg = function (req, res) {
    var attachment = new Attachment();
    attachment.saveUploadFile(req, function (info) {
        console.log("info", info);
        res.json({status: 1, info: "上传成功!", data: info});
    });

};