<?php
date_default_timezone_set('PRC');
include ('inc_db.php');
session_start();
$username = $_SESSION['username'];
$time = date('Y-m-d H:i');
if (isset($_POST['title'])){
    $title = $_POST['title'];
    $msg = $_POST['msg'];
    $sql = "insert into articles(username,title,msg,upload_time) VALUES ('$username','$title','$msg','$time')";
    $res = mysqli_query($link,$sql);
    if($res){
        $back['status'] = 1;//上传成功
    }else{
        $back['status'] = 2;//上传失败
    }
} else{
    $back['status'] = 2;//上传失败
}
echo json_encode($back);