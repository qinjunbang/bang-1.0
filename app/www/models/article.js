/**
 * Created by Lenovo on 2018/5/3.
 */
var mongoose = require('mongoose');
var ArticleSchema = require('../schemas/article');
var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;