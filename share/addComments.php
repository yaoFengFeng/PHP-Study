<?php
include('inc_db.php');
session_start();
$replyer = $_SESSION['username'];
$articleID = $_GET['artID'];
$msg = $_GET['msg'];
$time = date("Y-m-d H:i");

//$replyer = "安耀锋";
//$articleID = 11;
//$msg = "我是妖风呀";
//$time = date("Y/m/d");

$sql_insert_comments = "insert into comments(article_id,replyer,time_reply,msg) VALUES ('$articleID','$replyer','$time','$msg')";
$res_insert_comments = mysqli_query($link,$sql_insert_comments);

