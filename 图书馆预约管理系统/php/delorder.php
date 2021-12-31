<?php

//用户取消预约

header("Content-Type: text/html;charset=utf8");// 设置页面显示的文字编码
header('Access-Control-Allow-Origin: *');//可解决跨域问题
$con = mysqli_connect("localhost", "root", "123"); // 连接数据库
mysqli_query($con, "set names 'utf8'");//设置数据库的编码方式

$username = $_GET["username"];
$id = $_GET["id"];

if ($con) {
    mysqli_select_db($con, "room"); // 选择要使用的数据库mydatabase
    //将用户预约次数-1
    $query = "UPDATE `user` SET `number`= number - 1 WHERE username = '$username'";
    $result = mysqli_query($con, $query);     // 执行查询操作
    //查询用户预约的日期、时间、教学楼、楼层、教室
    $query = "SELECT * FROM `orders` WHERE id = ".$id;
    $result = mysqli_query($con, $query);     // 执行查询操作
    $row = mysqli_fetch_array($result);
    //根据查出来的数据到数据库中取出该教室的座位详情
    $query1 = "SELECT * FROM location WHERE building = '".$row['building']."' AND floor = '".$row['floor']."' AND sittype = '".$row['sittype']."' AND date = '".$row['date']."'";
    $result1 = mysqli_query($con, $query1);     // 执行查询操作
    $row1 = mysqli_fetch_array($result1);

    $a = $row1['sit'];//获得教室座位详情
    $a = json_decode($a);//转为数组
    $a[$row['time_index']][$row['sit_index']] = "Y";//设置座位可预约
    $a = json_encode($a);//转回字符串
    //将更新后的座位重新插入数据库
    $query1 = "UPDATE `location` SET `sit`='$a' WHERE building = '".$row['building']."' AND floor = '".$row['floor']."' AND sittype = '".$row['sittype']."' AND date = '".$row['date']."'";
    $result1 = mysqli_query($con, $query1);     // 执行查询操作
    //删除预约表中的预约信息
    $query = "DELETE FROM `orders` WHERE id = ".$id;
    $result = mysqli_query($con, $query);     // 执行查询操作


}

mysqli_close($con);

