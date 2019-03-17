<?php
include('inc_db.php');
session_start();
$username = "";
//$_GET['artID'] = -3;
//$_GET['str'] = "的";
if ($_GET['artID'] == -1) {//获取所有文章
    $sql = "select * from articles";
    echo json_encode(getArticles($sql));
}elseif ($_GET['artID'] == -2){//获取当前用户的所有文章
    $username = $_SESSION['username'];
    $sql = "select * from articles WHERE username = '$username'";
    echo json_encode(getArticles($sql));
}elseif ($_GET['artID'] == -3){//获取用户搜索内容匹配的文章
    $str = $_GET['str'];
    $sql = "select * from articles WHERE msg LIKE '%$str%'";
    $articleList =getArticles($sql);
    foreach ($articleList as $k=>$articleItem){
        $articleItem['msg'] = " ".$articleItem['msg'];
        $articleList[$k]['msg'] = str_replace($str,"<b style='color:red'>".$str."</b>",$articleItem['msg']);
    }
    echo json_encode($articleList);
//    var_dump($articleList) ;
}else {//获取某一篇文章内容
    $id = $_GET['artID'];
    $sql_select = "select msg from articles WHERE id = '$id'";
    $res_select = mysqli_query($link, $sql_select);
    $row = mysqli_fetch_array($res_select, MYSQLI_ASSOC);
    if ($_GET['flag'] != 1){
        $row['msg'] = deleteImg($row['msg']);
    }
    echo json_encode($row['msg']);
}


//删除img
function deleteImg($str){
        $a = $str;
        $b= (strpos($a,"<img"));
        $c= (strpos($a,".png"));
        if (!$c){
            $c= (strpos($a,".jpg"));
            if(!$c){
                $c= (strpos($a,".gif"));
            }
        }
        $d = substr($a,$b,$c+6);
        while ($b!=$c){
            $str = str_replace($d,"", $str);
            $a = $str;
            $b= (strpos($a,"<img"));
            $c= (strpos($a,".png"));
            if (!$c){
                $c= (strpos($a,".jpg"));
                if(!$c){
                    $c= (strpos($a,".gif"));
                }
            }
            $d = substr($a,$b,$c+6);
        }
        return $str;
}

//根据不同的sql语句获取 相应的文章
function getArticles($mysql){
    $link = mysqli_connect("localhost","root","","shares");
    mysqli_set_charset($link,"utf8");
    if(!$link) {
        echo "Connect failed:",mysqli_connect_error();
        exit;
    }

    $data = array();
    $res_select = mysqli_query($link, $mysql);
    while ($row = mysqli_fetch_array($res_select, MYSQLI_ASSOC)) {
        $is_praise = false;//false表示未点赞 true表示点过赞
        $id = $row['id'];
        if (isset($_SESSION['username'])) {//用户是否登录
            $username = $_SESSION['username'];
            $sql = "select * from articlepraise where article_id = '$id' and username = '$username'";
            $res = mysqli_query($link, $sql);
            $r = mysqli_fetch_assoc($res);
            if (!empty($r)) {//用户是否对该文章点过赞
                $is_praise = true;
            }
        }
        $sql_count_comment = "select count(*) from  comments WHERE article_id = '$id'";
        $res_count_comment = mysqli_query($link,$sql_count_comment);
        $count_comment = mysqli_fetch_assoc($res_count_comment)['count(*)'];

        $row['msg'] = deleteImg($row['msg']);
        $article = [
            'id' => $row['id'],
            'username' => $row['username'],
            'title' => $row['title'],
            'praise' => $row['praise'],
            'msg' => $row['msg'],
            'upload_time' => $row['upload_time'],
            'is_praise' => $is_praise,
            'count_comment'=>$count_comment,
        ];
        array_push($data, $article);
    }
    return $data;
}

