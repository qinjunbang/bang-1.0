/**
 * Created by Lenovo on 2018/4/17.
 */



// 首页
exports.index = function (req, res) {
    res.render('article', {
        action: 'index',
        title: '文章列表',
        data: [{id: 1, title:"我的第一个文章"}]
    });
};

// 编缉文章
exports.index.edit = function (req, res) {
    res.render('article', {
        action: 'edit',
        title: '新增文章'
    });
};

// 图片上传
exports.index.upload = function (req, res) {

};