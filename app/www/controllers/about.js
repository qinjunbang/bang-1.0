/**
 * Created by Lenovo on 2018/5/20.
 */


exports.index = function (req, res) {

    res.render("./www/pages/about", {
        title: "自我介绍"
    });
};