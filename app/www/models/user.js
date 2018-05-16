/**
 * Created by Lenovo on 2018/3/16.
 */
var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');
var User = mongoose.model("User", UserSchema);

module.exports = User;