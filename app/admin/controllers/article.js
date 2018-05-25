/**
 * Created by Lenovo on 2018/4/17.
 */
var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var _ = require('underscore');
var showdown = require('showdown');
var converter = new showdown.Converter();


// 首页
exports.index = function (req, res) {
    Article.find({}).exec(function (err, data) {
        if (err) {
            console.log("err:", err);
        }
        console.log(data);
        res.render('./admin/pages/article', {
            action: 'index',
            title: '文章列表',
            data: data
        });
    });

};

// 编写文章
exports.index.edit = function (req, res) {
    var params_id = req.params.id;
    if (params_id && params_id !== "") {
        Article.findById(params_id, function (err, data) {
            if (err) {
                console.log("err:", err);
            } else {
                data['contentHtml'] = converter.makeHtml(data['content']);
                res.render('article', {
                    action: 'edit',
                    title: '修改文章',
                    data: data
                });
            }
        });
    } else {
        res.render('article', {
            action: 'edit',
            title: '编写文章',
            data: []
        });
    }

};

// 发布文章
exports.index.add = function (req, res) {
    var data = req.body;
    console.log("文章提交内容", data);
    if (data.id && data.id !== "") {
        Article.findById(data.id, function (err, article) {
            if (err) {
                console.log("err: ", err);
                res.json({status: 0, info: "修改失败！", data: err});
            } else {
                var _article = _.extend(article, data);
                _article.save(function (err, article) {
                    if (err) {
                        console.log("err: ", err);
                        res.json({status: 0, info: "修改失败！", data: err});
                    }
                    res.json({status: 1, info: "修改成功！", data: []});
                });
            }

        });
    } else {
        var _article = new Article(data);
        _article.save(function (err, article) {
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
        Article.remove({_id: id}, function (err, article) {
            if (err) {
                console.log("err:", err);
                res.json({status: 0, info: "删除失败！", data: err});
            }
            res.json({status: 1, info: "删除成功！", data: []});
        });
    }
};