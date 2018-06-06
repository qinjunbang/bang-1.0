/**
 * Created by junbangqin on 2018/6/5.
 */
var moment = require('moment');
//引入图片上传模块
var formidable = require('formidable');
var fs = require('fs');

var Attachment = function (opts) {
    this.imgForm = formidable.IncomingForm();
    this.imgForm.encoding = "utf-8";
    this.imgForm.uploadDir = "./public/uploads/";
    this.imgForm.keepExtensions = true;
    this.imgForm.maxFiledsSize = 1 * 1024 *1024;

    this.saveUploadFile(opts);

};

Attachment.prototype = {
    //saveUploadFile
    saveUploadFile: function (req) {
        var _that = this;
        this.imgForm.parse(req, function (err, fields, files) {
            if (err) {
                return {status: 0, info: "上传出错啦!", data: [err]};
            }
            // 限制图片大小
            if (files.img.size > form.maxFiledsSize) {
                fs.unlink(files.img.path);
                return {
                    status: 0,
                    err: 401,
                    info: "图片应小于2M"
                };
            }
            var extName = _that.getExt(files.img.type);

            if (extName.length <= 0) {
                return {status: 0, info: "只支持jpg/png格式!", data: []};
            }

            var imgName = _that.getFileName(extName);

            var dirName = moment(Date.now()).format("YYYY-MM-DD");
            var newPath = _that.imgForm.uploadDir + dirName + "/" + imgName;
            fs.exists(_that.imgForm.uploadDir + dirName, function (exists) {
                if (!exists) {
                    var harDir =  _that.createDir(_that.imgForm.uploadDir + dirName);
                    if (harDir) {
                        _that.writeFile(files.img.path, newPath );
                    }
                } else {
                    _that.writeFile(files.img.path, newPath );
                }
            });
        });
    },
    //createDir
    createDir: function (pathName) {
        var creats = fs.mkdirSync(pathName);
        console.log("creats", creats);
        return creats;
    },
    //getFileName
    getFileName: function (extName) {
        var imgName = Date.now() + parseInt(Math.random() * 8999 + 10000) + '.' + extName;
        return imgName;

    },
    //getExt

    getExt: function (type) {
        var extName = '';

        switch (type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
            default:
        }

        return extName;
    },
    //writeFile
    writeFile: function (oldPath, newPath) {
        fs.rename(oldPath, newPath, function (err) {
            if (err) {
                console.log("err", err);
                return {
                    status: 0,
                    err: 401,
                    info: "图片上传失败"
                };
            }
            return {
                status: 1,
                info: "上传成功",
                data: {
                    url:"/uploads/" + timestamp  + "/" + imageName,
                    name: imageName
                }
            };
        });
    }
};

module.exports = Attachment;