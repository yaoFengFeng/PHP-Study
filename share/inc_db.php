<?php
header("Content-type: text/html; charset=utf-8");
date_default_timezone_set('PRC');
$link = mysqli_connect("localhost","root","","shares");
mysqli_set_charset($link,"utf8");
if(!$link) {
    echo "Connect failed:",mysqli_connect_error();
    exit;
}