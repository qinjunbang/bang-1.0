/**
 * Created by junbangqin on 2018/7/3.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleTypeSchema = new Schema({
    name: String, //标题
    updateAt: {
        type: Date,
        default: Date.now()
    },
    add_time: {
        type: Date,
        default: Date.now()
    }
});

ArticleTypeSchema.pre('save', function (next) {
    if (this.isNew) {
        this.updateAt = this.add_time = Date.now();
    } else {
        this.updateAt = Date.now();
    }

    next();
});

ArticleTypeSchema.statics = {
    select: function (id, cb) {
        if (id && id !== '') {
            return this.findOne({_id: id}).exec(cb);
        } else {
            return this.find({}).sort('updateAt').exec(cb);
        }
    }
};

module.exports = ArticleTypeSchema;
