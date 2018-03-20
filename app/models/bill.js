/**
 * Created by Lenovo on 2018/3/8.
 */
var mongoose = require('mongoose');
var BillSchema = require('../schemas/bill');
var Bill = mongoose.model('Bill', BillSchema);

module.exports = Bill;
