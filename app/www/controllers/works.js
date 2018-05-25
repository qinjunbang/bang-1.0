/**
 * Created by Lenovo on 2018/5/20.
 */

exports.index = function (req, res) {
    res.render("./www/pages/works", {
        title: "作品展示"
    });
};