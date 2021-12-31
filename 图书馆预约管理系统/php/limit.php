<?php
header("Content-Type: text/html;charset=utf8");// 设置页面显示的文字编码
header('Access-Control-Allow-Origin: *');//可解决跨域问题
$con = mysqli_connect("localhost", "root", "123"); // 连接数据库
mysqli_query($con, "set names 'utf8'");//设置数据库的编码方式

$building = $_GET["building"];
$floor = $_GET["floor"];
$sittype = $_GET["sittype"];
$date = $_GET['date'];
$nextdate = $_GET['nextdate'];
$time_index = $_GET['time_index'];
$sit_index = $_GET['sit_index'];
$limit_date = $_GET['limit_date'];

if ($con) {
    mysqli_select_db($con, "room"); // 选择要使用的数据库mydatabase
    //echo "building:$building,floor:$floor,sittype:$sittype,date:$date,time_index:$time_index,limit_date:$limit_date";
    //查询这个位置的主人
    $query = "SELECT * FROM `orders` WHERE building = '$building' AND floor = '$floor' AND sittype = '$sittype' AND date = '$date' AND time_index = '$time_index' AND sit_index = '$sit_index'";
    $result = mysqli_query($con, $query);     // 执行查询操作
    $row = mysqli_fetch_array($result);

    //插入新的黑名单日期
    $query = "UPDATE `user` SET `date`='$limit_date' WHERE username = '".$row['username']."'";
    $result = mysqli_query($con, $query);     // 执行查询操作
    //删除这个人今天和明天的预约
    $query = "DELETE FROM `orders` WHERE username ='".$row['username']."' AND (date = '$date' or date = '$nextdate')";
    $result = mysqli_query($con, $query);     // 执行查询操作
    //座位放空
    $query1 = "SELECT * FROM location WHERE building = '$building' AND floor = '$floor' AND sittype = '$sittype' AND date = '$date'";
    $result1 = mysqli_query($con, $query1);     // 执行查询操作
    $row1 = mysqli_fetch_array($result1);

    $a = $row1['sit'];
    $a = json_decode($a);
    $a[$row['time_index']][$row['sit_index']] = "Y";
    $a = json_encode($a);

    $query1 = "UPDATE `location` SET `sit`='$a' WHERE building = '$building' AND floor = '$floor' AND sittype = '$sittype' AND date = '$date'";
    $result1 = mysqli_query($con, $query1);     // 执行查询操作

}

mysqli_close($con);

