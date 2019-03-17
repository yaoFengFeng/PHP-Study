<?php
session_start();
$islogin = 0;
if (isset($_SESSION['islogin'])){
    $islogin = $_SESSION['islogin'];
    $username = $_SESSION['username'];
    $back['islogin'] = $islogin;
    $back['username'] = $username;
}
$back['islogin'] = $islogin;
echo json_encode($back);