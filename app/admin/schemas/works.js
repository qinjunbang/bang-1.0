/**
 * Created by junbangqin on 2018/7/28.
 */
/**
 * Created by Lenovo on 2018/3/8.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId; // 联表查询

var WorksSchema = new Schema({
    title: String, //标题
    summary: String, //简介
    content: String, //内容
    img: String, //图片
    categoryId: {
        type: ObjectId,
        ref: "ArticleType" // 关联表
    }, // 类别
    updateAt: {
        type: Date,
        default: Date.now()
    },
    add_time: {
        type: Date,
        default: Date.now()
    }
});

WorksSchema.pre('save', function (next) {
    if (this.isNew) {
        this.updateAt = this.add_time = Date.now();
    } else {
        this.updateAt = Date.now();
    }

    next();
});

WorksSchema.statics = {
    select: function (id, cb) {
        if (id && id !== '') {
            return this.findOne({_id: id}).exec(cb);
        } else {
            return this.find({}).sort('updateAt').exec(cb);
        }
    }
};

module.exports = WorksSchema;