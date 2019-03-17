//限制正文输入字数
$('.textarea').on('keyup', function () {
    if ($('.textarea').text().length >= 200) {
        alert('最多只能输入200个字');
        $('.textarea').text($('.textarea').text().substring(0, 200));
    }
});

//隐藏 文件上传的默认的丑陋的样式
$('#uploadPhoto').hide();
$('#btnUpload').hide();

//通过点击自定义的按钮触发 文件选择和上传按钮
$('#insertPhoto').click(function () {
    $('#uploadPhoto').click();
});

$('#submitPhoto').click(function () {
    $('#btnUpload').click();
});

// 通过ajax 提交form表单
$('#btnUpload').click(function () {
    //FormData html5才有 ie8及以下不支持 大部分主流浏览器支持
    var form = new FormData(document.getElementById("formPhoto"));
    var photoCount = document.getElementsByClassName("img_insert").length;
    var selectImg = document.getElementById('uploadPhoto');
    if (selectImg.value == "" || selectImg.value == undefined) {
        alert('请先选择图片');
    } else {
        if (photoCount < 3) {
            $.ajax({
                url: 'uploadPhoto.php',
                async: false,
                type: 'POST',
                dataType: 'json',
                data: form,
                processData: false,
                contentType: false,
                error: function () {
                    alert('网络繁忙');
                },
                success: function (data) {
                    $('.textarea').append("<img class='img_insert' src=" + data.path + ">");
                }
            });
        } else {
            alert("最多只能上传三张图片");
        }
    }
    selectImg.value = "";
});

//发布
$('.release').click(function () {
    var title = $('.title')[0].value;
    var msg = $('.textarea').html();
    alert(msg);
    if (title == "" || msg == "") {
        alert("必须输入标题和内容");
    } else {
        $.ajax({
            url: 'uploadArticle.php',
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {
                "title": title,
                "msg": msg
            },
            error: function () {
                alert('网络繁忙');
            },
            success: function (data) {
                if (data.status == 1) {
                    if (confirm('上传成功，再写一篇？')) {
                    } else {
                        window.location.href = "index.html";
                    }
                }
                else {
                    alert('上传失败,请检查人品');
                }
            }
        })
    }
})