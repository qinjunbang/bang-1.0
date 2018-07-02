/**
 * Created by junbangqin on 2018/7/3.
 */
var mongoose = require('mongoose');
var ArticleTypeSchema = require('../schemas/articleType');
var ArticleType = mongoose.model('ArticleType', ArticleTypeSchema);

module.exports = ArticleType;