<?php
header("Content-Type: text/html;charset=utf8");// 设置页面显示的文字编码
header('Access-Control-Allow-Origin: *');//可解决跨域问题
$con = mysqli_connect("localhost", "root", "123"); // 连接数据库
mysqli_query($con, "set names 'utf8'");//设置数据库的编码方式

$building = $_GET["building"];
$floor = $_GET["floor"];
$type = $_GET["type"];
$date = $_GET["date"];

if ($con) {
    mysqli_select_db($con, "room"); // 选择要使用的数据库，这里使用mydatabase

    $query = "UPDATE `location` SET `open`=0 WHERE date = '$date'";

    if($building != "全部all"){
        $query = $query . " AND building = '$building'";
    }
    if ($floor != "全部all"){
        $query = $query . " AND floor = '$floor'";
    }
    if ($type != "全部all"){
        $query = $query . " AND type = '$type'";
    }
    $result = mysqli_query($con,$query);
}



mysqli_close($con);

