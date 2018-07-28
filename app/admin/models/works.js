/**
 * Created by junbangqin on 2018/7/28.
 */
var mongoose = require('mongoose');
var WorksSchema = require('../schemas/works');
var Works = mongoose.model('Works', WorksSchema);

module.exports = Works;