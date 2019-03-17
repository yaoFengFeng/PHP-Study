<?php

include('inc_db.php');
if (isset($_GET['artID'])){
    $id = $_GET['artID'];
    $sql_select = "select * from comments WHERE article_id = '$id'";
    $res_select = mysqli_query($link, $sql_select);
    $data = array();
    while ($row = mysqli_fetch_array($res_select, MYSQLI_ASSOC)) {
        $comments = [
            'id' => $row['id'],
            'article_id' => $row['article_id'],
            'replyer' => $row['replyer'],
            'time_reply' => $row['time_reply'],
            'msg' => $row['msg'],
            'to_sb' => $row['to_sb'],
            'stars' => $row['stars'],
            'replyer_id' => $row['replyer_id']
        ];
        array_push($data, $comments);
    }
    echo json_encode($data);
//var_dump($data);
}else{
    session_start();
    $username = $_SESSION['username'];
    $sql_select = "select * from comments WHERE replyer = '$username'";
    $res_select = mysqli_query($link, $sql_select);
    $data = array();
    while ($row = mysqli_fetch_array($res_select, MYSQLI_ASSOC)) {
        $myid = $row['article_id'];
        $sql_s = "select title from articles WHERE id = '$myid'";
        $res_s = mysqli_query($link, $sql_s);
        $r = mysqli_fetch_assoc($res_s);

        $comments = [
            'id' => $row['id'],
            'article_id' => $row['article_id'],
            'replyer' => $row['replyer'],
            'time_reply' => $row['time_reply'],
            'msg' => $row['msg'],
            'to_sb' => $row['to_sb'],
            'stars' => $row['stars'],
            'artTitle' => $r['title']
        ];
        array_push($data, $comments);
    }
    echo json_encode($data);
//    var_dump($data);
}


