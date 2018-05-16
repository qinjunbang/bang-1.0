/**
 * Created by Lenovo on 2018/3/5.
 */
var mongoose = require('mongoose');
var Bill = mongoose.model('Bill');
var _ = require('underscore');

// 显示首页、列表
exports.index = function (req, res) {
    Bill.find({}).exec(function (err, data) {
        if (err) {
            console.log(err);
        }
        console.log("data", data);
        res.render('bill', {
            action: 'index',
            title: '账单管理页面',
            data: data
        });
    });
};

// 显示修改页面
exports.index.edit = function (req, res) {
    var params_id = req.params.id;

    if (params_id && params_id !== '') {
        Bill.findById(params_id, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                res.render('bill', {
                    action: 'edit',
                    title: '编辑页面',
                    data: data
                });
            }
        });
    } else {
       res.render('bill', {
           action: 'edit',
           title: '新增页面',
           data: {id: '', money: '', scene: '', pay_way: ''}
       });
    }
};

// 保存数据
exports.add = function (req, res) {
    var data = req.body;
    if (data.id && data.id !== '') {
        Bill.findById(data.id, function (err, bill) {
            if (err) {
                console.log(err);
            } else {
                var _bill = _.extend(bill, data);
                console.log("_bill", _bill);
                _bill.save(function (err, bill) {
                    if (err) {
                        console.log(err);
                        res.json({info: "修改失败！", status: 0, data: err});
                    } else {
                        res.json({info: "修改成功！", status: 1, data: []});
                    }
                });
            }
        });
    } else {
        if (!data.money || data.money === '') {
            res.json({info:"金额不能为空", status:0, data:[]});
        }
        if (!data.scene || data.scene === '') {
            res.json({info:"场景不能为空", status:0, data:[]});
        }

        var _bill = new Bill(data);
        _bill.save(function(err, bill) {
            if (err){
                res.json({info:"存储失败！", status: 0, data:[]})
            }
            res.json({info: "添加成功！", status: 1, data:[]});
        });
    }

};

// 删除数据
exports.del = function (req, res) {
    var id = req.body.id;
    console.log("id", id);

    if (id && id !== '') {
        Bill.remove({_id: id}, function(err, movie) {
            if (err) {
                console.log(err)
                res.json({info: "删除失败", status: 0, data: err});
            }
            else {
                res.json({info: "删除成功", status: 1, data: []});
            }
        });
    }
};
