/**
 * Created by Lenovo on 2018/5/20.
 */
var mongoose = require('mongoose');
var ArticleType = mongoose.model('ArticleType'); // 查分类表
var Article = mongoose.model('Article'); // 查文章表

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