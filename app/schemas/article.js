/**
 * Created by Lenovo on 2018/5/3.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: String, //标题
    summary: String, //简介
    content: String, //内容
    img: String, //图片
    updateAt: {
      type: Date,
      default: Date.now()
    },
    add_time: {
        type: Date,
        default: Date.now()
    }
});

ArticleSchema.pre('save', function (next) {
    if (this.isNew) {
        this.updateAt = this.add_time = Date.now();
    } else {
        this.updateAt = Date.now();
    }

    next();
});

ArticleSchema.statics = {
    select: function (id, cb) {
        if (id && id !== '') {
            return this.findOne({_id: id}).exec(cb);
        } else {
            return this.find({}).sort('updateAt').exec(cb);
        }
    }
};

module.exports = ArticleSchema;
