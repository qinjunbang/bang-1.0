/**
 * Created by junbangqin on 2018/7/3.
 */
var mongoose = require('mongoose');
var ArticleType = mongoose.model('ArticleType');
var _ = require('underscore');
var showdown = require('showdown');
var converter = new showdown.Converter();


// 首页
exports.index = function (req, res) {
    ArticleType.find({}).exec(function (err, data) {
        if (err) {
            console.log("err:", err);
        }
        console.log(data);
        res.render('./admin/pages/article-type', {
            action: 'index',
            title: '文章分类列表',
            data: data
        });
    });

};

// 编写文章
exports.index.edit = function (req, res) {
    var params_id = req.params.id;
    if (params_id && params_id !== "") {
        ArticleType.findById(params_id, function (err, data) {
            if (err) {
                console.log("err:", err);
            } else {
                res.render('./admin/pages/article-type', {
                    action: 'edit',
                    title: '修改文章',
                    data: data
                });
            }
        });
    } else {
        res.render('./admin/pages/article-type', {
            action: 'edit',
            title: '添加文章分类',
            data: []
        });
    }

};

// 发布文章
exports.index.add = function (req, res) {
    var data = req.body;
    console.log("文章提交内容", data);
    if (data.id && data.id !== "") {
        ArticleType.findById(data.id, function (err, articleType) {
            if (err) {
                console.log("err: ", err);
                res.json({status: 0, info: "修改失败！", data: err});
            } else {
                var _articleType = _.extend(articleType, data);
                _articleType.save(function (err, articleType) {
                    if (err) {
                        console.log("err: ", err);
                        res.json({status: 0, info: "修改失败！", data: err});
                    }
                    res.json({status: 1, info: "修改成功！", data: []});
                });
            }

        });
    } else {
        var _articleType = new ArticleType(data);
        _articleType.save(function (err, articleType) {
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
        ArticleType.remove({_id: id}, function (err, articleType) {
            if (err) {
                console.log("err:", err);
                res.json({status: 0, info: "删除失败！", data: err});
            }
            res.json({status: 1, info: "删除成功！", data: []});
        });
    }
};