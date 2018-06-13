/**
 * Created by Lenovo on 2018/5/27.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var MemberSchema = new Schema({
    name: {
        type: String
    },
    password: String,
    img: {
        type: String, //头像
        default: ""
    } ,
    updateAt: {
        type: Date,
        default: Date.now()
    },
    add_time: {
        type: Date,
        default: Date.now()
    }
});

MemberSchema.pre('save', function (next) {
    var member = this;

    if (this.isNew) {
        this.add_time = this.updateAt = Date.now();
    } else {
        this.updateAt = Date.now();
    }
    if (member.password.length < 16) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }

            bcrypt.hash(member.password, salt, function (err, hashPwd) {
                if (err) {
                    return next(err);
                }

                member.password = hashPwd;
                next();
            });
        });
    } else {
        next();
    }

});

MemberSchema.methods = {
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
MemberSchema.statics = {
    select: function (id, cb) {
        if (id && id !== '') {
            return this.findOne({_id: id}).exec(cb);
        } else {
            return this.find({}).sort('updateAt').exec(cb);
        }
    }
};

module.exports = MemberSchema;