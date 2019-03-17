var flag = false;
var loginUserName = document.getElementById('loginusername');
var loginPassWord = document.getElementById('loginPassword');
var code = document.getElementById('code');
var pwd = document.getElementById('pwd');
var rePwd = document.getElementById('repwd');
var phone = document.getElementById('phonenum');
var email = document.getElementById('email');
var username = document.getElementById('username');

if ($.cookie('myname') != "null" && $.cookie('myname') != undefined && $.cookie('myname') != "") {
    loginUserName.value = $.cookie('myname');
    loginPassWord.value = $.cookie('mypwd');
}


function login() {
    if ($("#check").prop("checked")) {

    }
    $.ajax({
        url: 'login.php',
        async: false,
        data: {
            'username': loginUserName.value,
            'password': loginPassWord.value,
            'code': code.value
        },
        type: 'get',
        error: function () {
            alert('网络繁忙');
        },
        success: function (data) {
            data = eval("(" + data + ")");
            switch (data.status) {
                case "1":
                    alert('验证码错误');
                    code.value = "";
                    refresh();
                    break;
                case "2":
                    alert('用户名或者密码错误');
                    loginUserName.value = "";
                    loginPassWord.value = "";
                    refresh();
                    break;
                case "3":
                    if ($("#check").prop("checked")) {
                        $.cookie('myname', loginUserName.value, { expires: 7 });
                        $.cookie('mypwd', loginPassWord.value, { expires: 7 });
                    }else{
                        $.cookie('myname', null); 
                        $.cookie('mypwd', null); 
                    }
                    window.location.href = "index.html";//要修改
                    break;
                default: ;
            }
        }
    });
}

//更新验证码
function refresh() {
    $('#verificationCode').attr("src", "verificationCode.php");
}


function register() {
    var e = checkEmail(email);
    var p = checkPhoneNum(phone);
    if (pwd.value == "") {
        alert('密码不能为空');
        pwd.focus();
    } else if (!(pwd.value == rePwd.value)) {
        alert('两次密码输入不一样，请重新输入');
        pwd.value = "";
        rePwd.value = "";
        pwd.focus();
    } else if (username.value == "") {
        alert('用户名不能为空');
        username.focus();
    } else if (!e) {
        alert('邮箱格式不正确,请重新输入');
        email.focus();
    } else if (!p) {
        alert('手机号码输入有误，请重新输入');
        phone.focus();
    } else {
        $.ajax({
            url: 'register.php',
            async: false,
            data: {
                'username': username.value,
                'password': pwd.value,
                'phone': phone.value,
                'email': email.value
            },
            type: 'get',
            error: function () {
                alert('网络繁忙');
            },
            success: function (data) {
                data = eval("(" + data + ")");
                switch (data.status) {
                    case "1":
                        alert('用户名已经存在');
                        username.value = "";
                        break;
                    case "2":
                        alert('手机号已经被注册');
                        phone.value = "";
                        break;
                    case "3":
                        alert('注册成功 去登陆');
                        window.location.href = "loginRegister.html"
                        break;
                    case "4":
                        alert('注册失败');
                        break;
                    default: ;
                }
            }
        });
    }

}

function checkEmail(email) {
    var isE = true;
    var isEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (email.value == "") {
        isE = false;
    } else if (!(isEmail.test(email.value))) {
        email.value = "";
        isE = false;
    }
    return isE;
}

function checkPhoneNum(phoneNum) {
    var p = true;
    var isPhone = /^1[3578]\d{9}$/;
    if (!(isPhone.test(phoneNum.value))) {
        phoneNum.value = "";
        p = false;
    }
    return p;
}