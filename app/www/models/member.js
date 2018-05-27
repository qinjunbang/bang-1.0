/**
 * Created by Lenovo on 2018/5/27.
 */
var mongoose = require('mongoose');
var MemberSchema = require('../schemas/member');
var Member = mongoose.model("Member", MemberSchema);

module.exports = Member;