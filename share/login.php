<?php
include('inc_db.php');
session_start();
$code = $_SESSION['code'];

$username = $_GET['username'];
$pwd = md5($_GET['password']);
$inputCode = $_GET['code'];

// $username = "ayf";
// $pwd = md5("123");

$sql = "select * from users where username = '$username' and password = '$pwd'";
$res = mysqli_query($link,$sql);
// $r = mysqli_fetch_assoc($res);
// echo ($pwd) ;
// exit();
if($code != $inputCode ){
    $back['status'] = "1";//验证码错误
    $back['code'] = "code=".$code."inputCode=".$inputCode;
}else if (!($r = mysqli_fetch_assoc($res))){
    $back['status'] = "2";//用户名或者密码错误
}else{
    $back['status'] = "3";//输入正确
    $_SESSION['islogin'] = 1;
    $_SESSION['username'] = $username;
}
echo json_encode($back);