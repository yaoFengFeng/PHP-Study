<?php
include('inc_db.php');
$article_id = $_POST['articleID'];
$is_praise = $_POST['is_praise'];
session_start();
$username = $_SESSION['username'];

if ($is_praise == "true") {
    $sql_insert = "insert into  articlepraise VALUES (NULL,'$article_id','$username')";
    $res_insert = mysqli_query($link, $sql_insert);
}else{
    $sql_delete = "delete from articlepraise WHERE article_id = '$article_id' and username = '$username'";
    $res_delete = mysqli_query($link, $sql_delete);
}
