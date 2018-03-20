/**
 * Created by Lenovo on 2018/3/8.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BillSchema = new Schema({
    money: String, //金额
    scene: String, // 场景
    pay_way: String, //支付方式
    updateAt: {
        type: Date,
        default: Date.now()
    },
    add_time: {
        type: Date,
        default: Date.now()
    }
});

BillSchema.pre('save', function (next) {
    if (this.isNew){
        this.updateAt = this.add_time = Date.now();
    } else {
        this.updateAt = Date.now();
    }
    next();
});

BillSchema.statics = {
    select: function (id, cb) {
        if (id && id !== '') {
            return this.findOne({_id: id}).exec(cb);
        } else {
            return this.find({}).sort('updateAt').exec(cb);
        }
    }
};

module.exports = BillSchema;