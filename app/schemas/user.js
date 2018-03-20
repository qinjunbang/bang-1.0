/**
 * Created by Lenovo on 2018/3/8.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');


var UserSchema = new Schema({
    name: {
        unique: true,
        type: String
    }, //金额
    password: String,
    role: {
        type: Number,  // 0 -> 超级管理员  1 -> 管理员
        default: 1
    },
    status:{
        type: Number, // 0 -> 等待审核  1 -> 正常  2 -> 审核失败
        default: 0
    },
    updateAt: {
        type: Date,
        default: Date.now()
    },
    add_time: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.pre('save', function (next) {
    var user = this;

    if (this.isNew){
        this.updateAt = this.add_time = Date.now();
    } else {
        this.updateAt = Date.now();
    }

    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, function (err, hashPwd) {
            if (err) {
                return next(err);
            }

            user.password = hashPwd;
            next();
        });
    });
});
UserSchema.methods = {
    comparePassword: function (_password, cb) {
        bcrypt.compare(_password, this.password, function(err, isMatch) {
            if (err) {
                return typeof cb === 'function' && cb(err);
            } else {
                typeof cb === 'function' && cb("", isMatch);
            }
        });
    }
};
UserSchema.statics = {
    select: function (id, cb) {
        if (id && id !== '') {
            return this.findOne({_id: id}).exec(cb);
        } else {
            return this.find({}).sort('updateAt').exec(cb);
        }
    }
};

module.exports = UserSchema;