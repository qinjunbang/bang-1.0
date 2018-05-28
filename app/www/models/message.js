/**
 * Created by Lenovo on 2018/5/28.
 */
var mongoose = require('mongoose');
var MessageSchema = require('../../www/schemas/Message');
var Message = mongoose.model("Message", MessageSchema);

module.exports = Message;