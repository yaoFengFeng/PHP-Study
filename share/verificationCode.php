<?php
header('Content-Type:image/png');
define('__DIR__', dirname(__FILE__) . '\\');
$str = '0123456789acbdefghijklmnopqrstuvwxyz';
$st = '';
$im = imagecreatetruecolor(150, 50);
$font = 'C:\Windows\Fonts\simkai.ttf';
session_start();
$code = "";
for ($i = 0; $i < 4; $i++) {
    $index = rand(0, 35);
    $color = imagecolorallocate($im, rand(0, 255), rand(0, 255), rand(0, 255));
    $angle = rand(-30, 30);
    $st = $str[$index];
    $code .= $st;
    imagettftext($im, 30, $angle, 20 + $i * 30, 35, $color, $font, $st);
}
$_SESSION['code'] = $code;
$color2 = imagecolorallocate($im, 0, 0, 0);
imagefill($im, 20, 8, $color2);
imagepng($im);
imagedestroy($im);

