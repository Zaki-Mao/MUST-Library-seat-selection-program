<?php
header("Content-Type: text/html;charset=utf8");// 设置页面显示的文字编码
header('Access-Control-Allow-Origin: *');//可解决跨域问题
$con = mysqli_connect("localhost", "root", "123"); // 连接数据库
mysqli_query($con, "set names 'utf8'");//设置数据库的编码方式

if ($con) {
    mysqli_select_db($con, "room"); // 选择要使用的数据库mydatabase

    $query = "UPDATE `location` SET `open`=1 ";
    $result = mysqli_query($con,$query);

}

mysqli_close($con);

