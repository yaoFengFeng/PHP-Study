$(document).ready(function () {
    var islogined = false;//是否已登录
    $.ajax({
        url: 'islogin.php',
        async: false,
        type: 'get',
        error: function () {
            alert('网络繁忙');
        },
        success: function (data) {
            data = eval("(" + data + ")");
            if (data.islogin == 0) {
                isLogin();
            } else {
                islogined = true;
                $('#username').text(data.username);
                isLogin();
            }
        }
    });

    //点击li 变换该li的样式
    var lis = document.querySelectorAll("li");
    for (var i = 0; i < lis.length; i++) {
        lis[i].style.borderBottom = "0px";
        lis[i].onclick = function () {
            //去掉第一个li默认样式
            $('.nav_li')[0].style.color = "";
            $('.nav_li')[0].style.borderBottom = "0px";

            //百度的一种比较简单的方法（可以改变其他li的样式）  但是没看懂 .t是啥意思
            lis.t ? lis.t.style.color = "" : 0;
            lis.t ? lis.t.style.borderBottom = "0px" : 0;
            this.style.color = "blue";
            this.style.borderBottom = "3px solid blue";
            lis.t = this;
        }
    }

    //第一个li设置默认样式
    $('.nav_li')[0].style.color = "blue";
    $('.nav_li')[0].style.borderBottom = "3px solid blue";

    //文章列表添加元素
    function addArticleItem(data) {
        data = eval("(" + data + ")");
        $('.message_list').empty();
        for (var i in data) {
            var str = "点赞";
            var ispraise = "";
            if (data[i]['is_praise']) {
                ispraise = "onpraise";
                str = "已点赞"
            }
            $('.message_list').append("<div class='message_item' id='item_msg'>"
                + "<div class='msg_title'><a><b>" + data[i]['title'] + "</b></a></div>"
                + "<div class='author'><img src='img/image_head.jpg'><p><b> " + data[i]['username'] + "</b></p> <span>此人很懒什么都没留下</span></div>"
                + "<div class='msg_all'>"
                + "<div class='msg_body_hidden msg_body_show'>" + data[i]['msg']
                + "</div>"
                + "</div>"
                + "<p class='article_time'>发布于 " + data[i]['upload_time'] + "</p>"
                + "<div class='operation'>"
                + "<input class='articleId' value='" + data[i]['id'] + "' type='hidden'>"
                + "<input class='article_count_comment' value='" + data[i]['count_comment'] + "' type='hidden'>"
                + "<button class='btn praise " + ispraise + "'><span class='str'>" + str + "</span><span class='count_praise'>" + data[i]['praise'] + "</span></button>"
                + "<button class='btn comments'><span> " + data[i]['count_comment'] + "</span>条评论</button>"
                + "<button class='btn read_more'>阅读全文 </button>"
                + "</div>"
                + "<div class='art_comments'>"
                + "<div class='comment_title'><span class='count_comments'></span></div>"
                + "<div class='comment_list'>"
                + "</div>"
                + "<div class='wirte_comment'>"
                + "<div contenteditable='true' class='input_comment' placeholder='写下你的评论…'></div>"
                + "<button class='submit_comment'>提 交</button>"
                + "</div>"
                + "<br style='clear:both'> "
                + "</div>"
                + "</div>"
                + "<br style='clear:both'> ");
        }
    }

    //点击收起全部 收起全部文章和评论
    $('.packUpAll').click(function(){
        for(var i = 0;i<$('.comments').length;i++){  
            var str = $('.comments')[i].innerText;          
            if(str.trim() == "收起评论"){
                $('.comments')[i].click();
            }
        }

        for(var i = 0;i<$('.read_more').length;i++){  
            var str = $('.read_more')[i].innerText;          
            if(str.trim() == "收起"){
                $('.read_more')[i].click();
            }
        }
    })

    //获取全部文章
    $.ajax({
        url: 'getArticles.php',
        async: false,
        type: 'get',
        data: {
            "artID": -1
        },
        error: function () {
            alert('网络繁忙');
        },
        success: function (data) {
            addArticleItem(data);
        }
    });
    //是否登录 需要的变化
    function isLogin() {
        if (islogined) {
            $('.loginOrRegister').hide();
            $('.user').show();
            //显示评论框
            $('.wirte_comment').show();
        } else {
            $('.loginOrRegister').show();
            $('.user').hide();
            //隐藏评论框
            $('.wirte_comment').hide();
        }
    }

    //退出 切换为未登录状态 删除后台session 
    $('#exit').click(function () {
        islogined = false;
        isLogin();
        $('.logined').hide();
        $.ajax({
            url: 'exit.php',
            async: false,
            type: 'get',
            error: function () {
                alert('网络繁忙');
            },
        });
        //刷新页面（重新进入页面）
        window.location.href = "index.html"
    })

    //查询天气 
    $('.search_weather').click(function () {
        if (islogined) {
            $.ajax({
                url: 'weather.php',
                async: false,
                type: 'get',
                error: function () {
                    alert('网络繁忙');
                },
                success: function (data) {
                    data = eval("(" + data + ")");//string类型转化成json
                    $('#myWeather').text(data.result.today.weather);
                    $('#wind').text(data.result.today.wind);
                    $('#temp').text(data.result.today.temperature);
                    $('#dressing_advic').text(data.result.today.dressing_advice);
                    $('.logined').show();
                }
            });
        } else {
            alert('需要登录后才能查看');
        }
    })

    //去分享
    $('#toEditor').click(function () {
        if (islogined) {
            window.open("editor.html");
        } else {
            alert('请先登录');
        }
    });


    //点击我的文章
    $('.myArticle').click(function () {
        if (islogined) {
            $.ajax({
                url: 'getArticles.php',
                async: false,
                type: 'get',
                data: {
                    "artID": -2,
                },
                error: function () {
                    alert('网络繁忙');
                },
                success: function (data) {
                    addArticleItem(data);
                }
            });
        } else {
            alert('请先登录');
            $('.recommend').click();
        }

    });

    //点击推荐
    $('.recommend').click(function () {
        $.ajax({
            url: 'getArticles.php',
            async: false,
            type: 'get',
            data: {
                "artID": -1,
            },
            error: function () {
                alert('网络繁忙');
            },
            success: function (data) {
                addArticleItem(data);
            }
        });
    });

    //点击搜索
    $('.search').click(function () {
        var str = ($('.search_input')[0].value).trim();
        if ("" != str) {
            $.ajax({
                url: 'getArticles.php',
                async: false,
                type: 'get',
                data: {
                    "artID": -3,
                    "str": str
                },
                error: function () {
                    alert('网络繁忙');
                },
                success: function (data) {
                    addArticleItem(data);
                }
            });
        }

    });

    //点击我的评论
    $('#myComments').click(function () {
        if (islogined) {
            $.ajax({
                url: 'getComments.php',
                async: false,
                type: 'get',
                error: function () {
                    alert('网络繁忙');
                },
                success: function (data) {
                    data = eval("(" + data + ")");
                    $('.myAllComments .comment_list').empty();
                    for (var i in data) {
                        $('.myAllComments .comment_list').append(
                            "<div class='comment_item'> "
                            + "<div class='article_title'><h2>" + data[i]['artTitle'] + "</h2></div>"
                            + "<div class='comment_author'> "
                            + " <img src='img/image_head.jpg'>"
                            + "<span class='replyer'>" + data[i]['replyer'] + "</span>"
                            + " <span class='reply_time'>" + data[i]['time_reply'] + "</span>"
                            + "</div>"
                            + "<div class='reply_msg'>" + data[i]['msg'] + "</div>"
                            + "</div>");
                    }
                }
            });
            $('.myAllComments').css({ 'height': $(document).height(), 'width': $(document).width() });//遮罩层设置全屏
            $('.myAllComments').show();
        }else{
            alert('还未登录');
        }

    });


    //点赞 取消点赞
    // $('.praise').click(function () {  选择器直接绑定会导致 第二次append元素时里面的按钮无不能被该方法绑定
    $(document).on("click", ".praise", function () {//换成这种绑定方式就好了
        var id = $(this.parentNode).find('.articleId')[0].value;//在自定义的隐藏域中获取当前文章id
        var flag = false;//false 取消点赞 true点赞
        if (islogined) {
            if ($(this).find('.str').text() == "点赞") {
                $(this).find('.str').text("已点赞");
                $(this).find('.count_praise').text(Number($(this).find('.count_praise').text()) + 1);
                flag = true;
            } else {
                flag = false;
                $(this).find('.str').text("点赞");
                $(this).find('.count_praise').text(Number($(this).find('.count_praise').text()) - 1);
            }
            $(this).toggleClass('onpraise');
            //后台点赞表 增删该文章点赞记录
            $.ajax({
                url: 'praise.php',
                async: false,
                type: 'POST',
                data: {
                    "articleID": id,
                    "is_praise": flag
                },
                error: function () {
                    alert('网络繁忙');
                },
            });
        } else {
            alert('请先登录');
        }
    })

    //点击 阅读全文 或者点击 文章标题；展示全文信息 或者收起隐藏部分内容
    // $('.read_more').click(function () {
    $(document).on("click", ".read_more", function () {
        readMore(this);
    })
    // $('.msg_title').click(function () {
    $(document).on("click", ".msg_title", function () {
        $($(this.parentNode).find('.read_more')[0]).click();
    })

    //点击评论展示所有评论信息 
    // $('.comments').click(function () {
    $(document).on("click", ".comments", function () {
        getComments(this);//将当前点击的对象this 传入方法
        isLogin();  //已登录会显示评论框 反之不显示      
    })

    //提交评论
    // $('.submit_comment').click(function () {
    $(document).on("click", ".submit_comment", function () {
        var str = $($(this.parentNode).find('.input_comment')[0]);
        var id = $(this.parentNode.parentNode.parentNode).find('.articleId')[0].value;//在自定义的隐藏域中获取当前文章id

        if (!(str.text() == "") && str.text().length <= 100) {
            $.ajax({
                url: 'addComments.php',
                async: false,
                type: 'get',
                data: {
                    "artID": id,
                    "msg": str.text()
                },
                error: function () {
                    alert('网络繁忙');
                },
            });
            str.text("");
            //模拟点击两次 评论  达到刷新评论表的效果 哈哈哈
            $($(this.parentNode.parentNode.parentNode).find('.comments')[0]).click();
            $($(this.parentNode.parentNode.parentNode).find('.comments')[0]).click();
            var count_comment = $(this.parentNode.parentNode.parentNode).find('.article_count_comment')[0].value;
            $(this.parentNode.parentNode.parentNode).find('.article_count_comment')[0].value = Number(count_comment)+1;
            $($(this.parentNode.parentNode).find('.count_comments')[0]).text((Number(count_comment)+1) + '条评论');
        } else {
            alert('评论内容不能为空且评论内容不能超过100字');
        }
    })


    //展示某一篇文章的评论信息 从后台获取该文章的评论信息 参数e 当前点击的对象
    function getComments(e) {
        var id = $(e.parentNode).find('.articleId')[0].value;
        var countcomment = $(e.parentNode).find('.article_count_comment')[0].value;

        if ($(e).text().trim() == "收起评论") {
            $(e).text(countcomment + '条评论');
            $($(e.parentNode.parentNode).find('.art_comments')[0]).hide();
        } else {
            $(e).text("收起评论");
            $($(e.parentNode.parentNode).find('.count_comments')[0]).text(countcomment + '条评论');
            //获取评论列表 添加到list中
            $.ajax({
                url: 'getComments.php',
                async: false,
                type: 'get',
                data: {
                    "artID": id,
                },
                error: function () {
                    alert('网络繁忙');
                },
                success: function (data) {
                    data = eval("(" + data + ")");
                    $($(e.parentNode.parentNode).find('.comment_list')[0]).empty();
                    for (var i in data) {
                        $($(e.parentNode.parentNode).find('.comment_list')[0]).append(
                            "<div class='comment_item'> "
                            + "<div class='comment_author'> "
                            + " <img src='img/image_head.jpg'>"
                            + "<span class='replyer'>" + data[i]['replyer'] + "</span>"
                            + " <span class='reply_time'>" + data[i]['time_reply'] + "</span>"
                            + "</div>"
                            + "<div class='reply_msg'>" + data[i]['msg'] + "</div>"
                            + "</div>");
                    }
                }
            });
            $($(e.parentNode.parentNode).find('.art_comments')[0]).show();//显示文章的评论列表
        }
    }

    //展示全文信息  或者收起隐藏部分内容
    function readMore(e) {
        var id = $(e.parentNode).find('.articleId')[0].value;
        var flag = 0;//0表示展示全文 需要获取全文信息 1表示隐藏部分内容 需要后台去掉图片
        if ($(e).text().trim() == '阅读全文') {
            $(e).text('收起');
            $($(e.parentNode.parentNode).find('.author')[0]).show();
            $($(e.parentNode.parentNode).find('.article_time')[0]).show();
            flag = 1;
        } else {
            $(e).text('阅读全文');
            $($(e.parentNode.parentNode).find('.author')[0]).hide();
            $($(e.parentNode.parentNode).find('.article_time')[0]).hide();
            flag = 0;
        }
        //由于之前获取的文章内容是删除了图片的 所以要重新获取该文章内容
        $.ajax({
            url: 'getArticles.php',
            async: false,
            type: 'get',
            data: {
                "artID": id,
                "flag": flag
            },
            error: function () {
                alert('网络繁忙');
            },
            success: function (data) {
                data = eval("(" + data + ")");
                $($(e.parentNode.parentNode).find('.msg_body_show')[0]).html(data);
            }
        });
        $($(e.parentNode.parentNode).find('.msg_body_show')[0]).toggleClass('msg_body_hidden');//展示全文 或收起（通过删除和获取msg_body_hidden样式）
    }
})
