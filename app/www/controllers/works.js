/**
 * Created by Lenovo on 2018/5/20.
 */

exports.index = function (req, res) {
    res.render("works", {
        title: "作品展示"
    });
};