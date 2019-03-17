<?php
include('inc_db.php');
session_start();
$username =  $_SESSION['username'];
if (isset($_FILES["photo"])) {
    if (is_uploaded_file($_FILES["photo"]["tmp_name"])) {
        $fileMimes = array('image/gif', 'image/png', 'image/jpeg');
        if (!in_array($_FILES["photo"]["type"], $fileMimes)) {
            echo "<script> alert('只能上传gif,png,jpg文件');history.back();</script>";
            die;
        }
        //为用户在upLoadFile下创建该用户的文件夹
        $dir = iconv("UTF-8", "GBK", "upLoadFile/".$username);
        if (!file_exists($dir)){
            mkdir ($dir,0777,true);
        }
        //文件命名:时间戳.随机数.文件类型后缀 保存至upLoadFile文件夹
        $filetype = substr($_FILES['photo']['name'], strrpos($_FILES['photo']['name'], '.', 0));
        $to_file = "upLoadFile/".$username.'/' . time() . rand(10000, 99999) . $filetype;
        move_uploaded_file($_FILES["photo"]["tmp_name"], $to_file);

        $back['path'] = $to_file;
        echo json_encode($back);
        die;

    } else {
        echo "<script> alert('上传失败');history.back();</script>";
    }
}else{
    $back['path'] = "wakjhajsjfhkjh";
    echo json_encode($back);
}
