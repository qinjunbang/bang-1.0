/**
 * Created by Lenovo on 2018/5/20.
 */
var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var _ = require('underscore');

exports.index = function (req, res) {
    Message.find({}).populate('from','name img').populate('reply.from reply.to', 'name img').sort({"add_time": -1}).exec(function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("data", data);
            res.render("./www/pages/message", {
                title: "留言板",
                data: data
            });
        }
    });

};

//留言
exports.add = function (req, res) {
    var data = req.body;
    var message = new Message(data);

    if (!data.from || data.from === '') {
        res.json({status: 0, info: "你还没有登录~！", data: []});
    } else {

        if (data.mid) {
            Message.findById(data.mid, function (err, message) {
                var reply = {
                    from: data.from,
                    to: data.uid,
                    content: data.content
                };

                message.reply.push(reply);

                message.save(function (err, message) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json({status: 1, info: "回复成功~", data: []});
                    }
                });
            });
        } else {
            message.save(function (err, message) {
                if (err) {
                    console.log("err:", err);
                    res.json({status: 0, info:"留言失败！", data: [err]});
                } else {
                    res.json({status: 1, info: "留言成功！", data: [message]});
                }
            });
        }

    }

};
exports.select = function (req, res) {
    Message.find({}).populate('from','name img').populate('reply.from reply.to', 'name img').sort({"add_time": -1}).exec(function (err, data) {
        if (err) {
            console.log(err);
        } else {
           res.json({status: 1, info: "获取数据成功", data: data});
        }
    });
};