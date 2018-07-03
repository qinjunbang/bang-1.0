/**
 * Created by Lenovo on 2018/5/20.
 */
var mongoose = require('mongoose');
var ArticleType = mongoose.model('ArticleType'); // 查分类表
var Article = mongoose.model('Article'); // 查文章表

var showdown = require('showdown');
var converter = new showdown.Converter();

exports.index = function (req, res) {
    ArticleType.find({}).exec(function (err, articleType) {
        if (err) {
            console.log("err", err);
        }
        Article.find({}).sort({"add_time": -1}).exec(function (err, article) {
            if (err) {
                console.log("err", err);
            } else {
                var data = {};
                // 拿到所有文章分类
                data['articleType'] = articleType;
                // 拿到所有文章
                data['article'] = article;

                // 渲染页面
                res.render('./www/pages/article', {
                    title: "文章列表",
                    data: data
                });
            }
        });
    });

};

// 文章详情
exports.index.detail = function (req, res) {
    // 渲染页面
    var artile_id = req.params.id;
    if (artile_id && artile_id !== "") {
        Article.findById(artile_id, function (err, article) {
            if (err) {
                console.log("err:", err);
            } else {
                article['contentHtml'] = converter.makeHtml(article['content']);
                console.log("article.contentHtml", article.contentHtml);
                res.render('./www/pages/article-detail', {
                    title: "文章详情",
                    data: article
                });
            }
        });
    }
};