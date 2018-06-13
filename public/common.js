/**
 * Created by Lenovo on 2018/3/8.
 */

// 保存提交
function save (url, formId) {
    saveForm(url, formId, function (res) {
        console.log("res", res);
        if (res.status === 1) {
            showModal(res.info, 1);
        } else {
            showModal(res.info,0);
        }
    });
}

// 新增
function add (url, height) {
    showIframeModal(url, height);
}

// 编辑
function edit (url, formId, height, type) {
    var objForm = '';

    if (formId.indexOf("#") >= 0) {
        objForm = $(formId);
    } else {
        objForm = $("#" + formId);
    }

    var data = objForm.serializeArray();

    if (data.length > 2) {
        showModal("不能多选!");
        return;
    }

    // <=1 是因为有个DataTable 隐藏的 "tableList_length" input 框
    if (data.length <= 1) {
        showModal("您没有选择任何数据！");
        return;
    }

    url = url + "/" + data[1].value;
    if (type === 'skip') {
        location.href = url
    } else {
        showIframeModal(url, height);
    }
}

// 删除
function del (url, formId) {
    console.log("url", url);
    if($(".checkBox input[type='checkbox']").is(':checked') !=true){
        showModal('至少勾选一项');
        return;
    }
    showModal("确定删除该数据？", 0, function () {
        console.log("666");
        saveForm (url, formId, function (res) {
            if (res.status === 1) {
                showModal(res.info,1);
            } else {
                showModal(res.info);
            }
        });
    });
}

// 提交表单
function saveForm (url, formId, cb) {
    var objForm = '';
    if (formId.indexOf("#") >= 0) {
        objForm = $(formId);
    } else {
        objForm = $("#" + formId);
    }

    if (objForm.length < 0) {
        showModal("表单不存在！");
        return;
    }
    var data = objForm.serialize();
    console.log("formdata", data);
    if (!data) {
        showModal(formId + "表单值为空！");
        return;
    }
    $.post(url, data, function (res) {
        typeof cb === 'function' && cb (res);
    });

}

// 消息提示框
function showModal(info, type, cb) {
    console.log($("#infoModal"));
    if ($("#infoModal").length) {
        $("#infoModal .modal-body p").text(info)
    } else {
        var htmlText = [];
        htmlText.push("<div class='modal fade' id='infoModal' style='z-index: 99999' role='dialog'>");
        htmlText.push("<div class='modal-dialog' role='document'>");
        htmlText.push("<div class='modal-content'>");
        htmlText.push("<div class='modal-header'>");
        htmlText.push("<button type='button' class='close' data-dismiss='modal' aria-label='Close'>");
        htmlText.push("<span aria-hidden='true'>")
        htmlText.push("&times;");
        htmlText.push("</span>");
        htmlText.push("</button>");
        htmlText.push("<h4 class='modal-title'>");
        htmlText.push("提示");
        htmlText.push("</h4>");
        htmlText.push("</div>");
        htmlText.push("<div class='modal-body'>");
        htmlText.push("<p>");
        htmlText.push(info);
        htmlText.push("</p>");
        htmlText.push("</div>");
        htmlText.push("<div class='modal-footer'>");
        htmlText.push("<button type='button' class='btn btn-success' id='closeModal' data-dismiss='modal'>");
        htmlText.push("确定");
        htmlText.push("</button>");
        htmlText.push("</div>");
        htmlText.push("</div>");
        htmlText.push("</div>");
        htmlText.push("</div>");
        $(window.parent.document).find("body").append(htmlText.join(''));
    }

    $(window.parent.document).find("#infoModal").modal("show");
    $(window.parent.document).find("#closeModal").click(function () {
        $(window.parent.document).find("#infoModal,.modal-backdrop").remove();
        $(".modal-backdrop").remove();
        $("body").removeClass("modal-open");
        $("body").css({
            padding: 0
        });
        typeof cb === 'function' &&  cb();
        if(type != 1){
            $(window.parent.document).find("#infoModal").modal("hide");
            return;
        }
        window.parent.location.reload();
    })
}

// 关闭消息提示框
function closeInfoModal(cb) {
    typeof cb === 'function' && cb();
}
// 显示带iframe的模态框
function showIframeModal(url, height, cb) {
    console.log(url);
    var htmlText = [];
    htmlText.push("<div class='modal fade' id='iframeModal' role='dialog'>");
    htmlText.push("<div class='modal-dialog' role='document'>");
    htmlText.push("<div class='modal-content'>");
    htmlText.push("<div class='modal-header'>");
    htmlText.push("<button type='button' class='close' data-dismiss='modal' aria-label='Close'>");
    htmlText.push("<span aria-hidden='true'>");
    htmlText.push("&times;");
    htmlText.push("</span>");
    htmlText.push("</button>");
    htmlText.push("<h4 class='modal-title'>");
    htmlText.push("提示");
    htmlText.push("</h4>");
    htmlText.push("</div>");
    htmlText.push("<div class='modal-body'>");
    htmlText.push("<iframe id='modal-iframe' src='" + url + "' style='width: 100%;height:" + height + "px;border: none;'></iframe>");
    htmlText.push("</div>");
    // htmlText.push("<div class='modal-footer'>");
    // htmlText.push("<button type='button' class='btn btn-default' data-dismiss='modal' onclick='closeInfoModal(" + cb + ")'>");
    // htmlText.push("确定");
    // htmlText.push("</button>");
    // htmlText.push("</div>");
    htmlText.push("</div>");
    htmlText.push("</div>");
    htmlText.push("</div>");
    $("body").append(htmlText.join(''));
    $("#iframeModal").modal("show");

    if (!height || height < 1) {
        $("#iframeModal").on('shown.bs.modal', function () {
            setTimeout(function () {
                var h = $("#modal-iframe").get(0).contentWindow.document.body.scrollHeight;
                $("#modal-iframe").css("height", h);
            }, 300);
        });
    }

}

// 上传图片模态框
function showImageModal (url,cb) {
    var htmlText = [];
    htmlText.push("<div class='modal fade' id='imageModal' role='dialog'>");
    htmlText.push("<div class='modal-dialog modal-sm' role='document'>");
    htmlText.push("<div class='modal-content'>");
    htmlText.push("<div class='modal-header'>");
    htmlText.push("<button type='button' class='close' data-dismiss='modal' aria-label='Close'>");
    htmlText.push("<span aria-hidden='true'>");
    htmlText.push("&times;");
    htmlText.push("</span>");
    htmlText.push("</button>");
    htmlText.push("<h4 class='modal-title'>");
    htmlText.push("提示");
    htmlText.push("</h4>");
    htmlText.push("</div>");
    htmlText.push("<div class='modal-body'>");
    htmlText.push("<form id='img-form' enctype='multipart/form-data'>");
    htmlText.push("<label for='img-file' class='img-label bg-success'>点击上传图片</label>");
    htmlText.push("<input type='file' name='img' id='img-file' multiple='multiple' accept='image/*' onchange='uploadsImages(\""+url+"\""+ ',' + cb + ");'/>");
    htmlText.push("</div>");
    htmlText.push("<div class='modal-footer'>");
    htmlText.push("<a data-dismiss='modal'> 关闭</a>");
    htmlText.push("</div>");
    htmlText.push("</div>");
    htmlText.push("</div>");
    htmlText.push("</div>");

    $("body").append(htmlText.join(""));
    $("#imageModal").modal('show');
}

// 上传图片
function uploadsImages (url, cb) {
    var form = $("#img-form")[0];
    var formData = new FormData(form);

    $.ajax({
        type: "POST",
        data: formData,
        url: url,
        processData: false,
        contentType: false,
        success: function (res) {
            typeof cb === 'function' && cb(res);
        },
        error: function (err) {
            console.log("err", err);
        }
    });
}
