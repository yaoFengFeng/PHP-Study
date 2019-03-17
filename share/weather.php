<?php
header("Content-type: text/html; charset=utf-8");
if (isset($_GET['id'])){
    $id = $_GET['id'][0];
    $weather_date =trim($_GET['date']);
}
//$id = 2331;
//$weather_date = '2017-01-01';

$ch1 = curl_init();
$url1 = "http://v.juhe.cn/weather/index?cityname=%E6%B8%A9%E5%B7%9E&dtype=&format=&key=cdbb5ba3bdedf1f04891cdf14397c5ce";
curl_setopt($ch1, CURLOPT_URL, $url1);
curl_setopt($ch1, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch1, CURLOPT_HEADER, 0);
$output = curl_exec($ch1);
curl_close($ch1);
echo $output;
