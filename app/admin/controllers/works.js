/**
 * Created by junbangqin on 2018/7/28.
 */
var mongoose = require('mongoose');
var Works = mongoose.model('Works');
var _ = require('underscore');



// 首页
exports.index = function (req, res) {
    Works.find({}).exec(function (err, data) {
        if (err) {
            console.log("err:", err);
        }
        console.log(data);
        res.render('./admin/pages/works', {
            action: 'index',
            title: '作品管理',
            data: data
        });
    });

};

// 编写文章
exports.index.edit = function (req, res) {
    var params_id = req.params.id;
    if (params_id && params_id !== "") {
        Works.findById(params_id, function (err, data) {
            if (err) {
                console.log("err:", err);
            } else {
                res.render('./admin/pages/works', {
                    action: 'edit',
                    title: '作品编辑',
                    data: data
                });
            }
        });
    } else {
        res.render('./admin/pages/works', {
            action: 'edit',
            title: '新增作品',
            data: []
        });
    }

};

// 发布文章
exports.index.add = function (req, res) {
    var data = req.body;
    if (data.id && data.id !== "") {
        Works.findById(data.id, function (err, works) {
            if (err) {
                console.log("err: ", err);
                res.json({status: 0, info: "修改失败！", data: err});
            } else {
                var _works = _.extend(works, data);
                _works.save(function (err, works) {
                    if (err) {
                        console.log("err: ", err);
                        res.json({status: 0, info: "修改失败！", data: err});
                    }
                    res.json({status: 1, info: "修改成功！", data: []});
                });
            }

        });
    } else {
        var _works = new Works(data);
        _works.save(function (err, works) {
            if (err) {
                console.log("err:", err);
                res.json({status: 0, info: "添加失败！", data: err});
            }
            res.json({status: 1, info: "添加成功！", data: []});
        });
    }

};

exports.index.del = function (req, res) {
    var id = req.body.id;

    if (id && id !== '') {
        Works.remove({_id: id}, function (err, works) {
            if (err) {
                console.log("err:", err);
                res.json({status: 0, info: "删除失败！", data: err});
            }
            res.json({status: 1, info: "删除成功！", data: []});
        });
    }
};