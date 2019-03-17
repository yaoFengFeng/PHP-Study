<?php
include('inc_db.php');

$username = $_GET['username'];
$password = md5($_GET['password']);
$phone = $_GET['phone'];
$email = $_GET['email'];

//$username = "妖枫枫";
//$password = "132";
//$phone = "15258670550";
//$email = "13@qq.com";

$sql = "select * from users WHERE username = '$username'";
$res = mysqli_query($link, $sql);
$sqlp = "select * from users WHERE phone = '$phone'";
$resp = mysqli_query($link, $sqlp);
//var_dump($res = mysqli_query($link,$sql));
//exit();
if ($r = mysqli_fetch_assoc($res)) {
    $back['status'] = "1";//用户名已存在
} elseif ($r = mysqli_fetch_assoc($resp)) {
    $back['status'] = "2";//手机号已经被注册
}else{
    $sql = "insert into users VALUES (NULL,'$username','$password','$email','$phone')";
    $res = mysqli_query($link,$sql);
    if ($res){
        $back['status'] = "3";//注册成功
    }else{
        $back['status'] = "4";//注册失败
    }
}
echo json_encode($back);