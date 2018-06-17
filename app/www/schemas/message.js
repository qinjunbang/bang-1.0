/**
 * Created by Lenovo on 2018/5/28.
 */
/**
 * Created by Lenovo on 2018/5/27.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var MessageSchema = new Schema({
    from: {
        type: ObjectId,
        ref: 'Member'
    },
    reply: [{
        from: {
            type: ObjectId,
            ref: 'Member'
        },
        to: {
            type: ObjectId,
            ref: 'Member'
        },
        content: String,
        add_time: {
            type: Date,
            default: Date.now()
        }
    }],

    content: String,
    updateAt: {
        type: Date,
        default: Date.now()
    },
    add_time: {
        type: Date,
        default: Date.now()
    }
});

MessageSchema.pre('save', function (next) {
    if (this.isNew) {
        this.add_time = this.updateAt = Date.now();
    } else {
        this.updateAt = Date.now();
    }

    next();
});


MessageSchema.statics = {
    select: function (id, cb) {
        if (id && id !== '') {
            return this.findOne({_id: id}).exec(cb);
        } else {
            return this.find({}).sort('updateAt').exec(cb);
        }
    }
};

module.exports = MessageSchema;