<?php
header("Content-Type: text/html;charset=utf8");// 设置页面显示的文字编码
header('Access-Control-Allow-Origin: *');//可解决跨域问题
$con = mysqli_connect("localhost", "root", "123"); // 连接数据库
mysqli_query($con, "set names 'utf8'");//设置数据库的编码方式

$username = $_GET["username"];
$password = $_GET["password"];

if ($con) {
    mysqli_select_db($con, "room"); // 选择要使用的数据库mydatabase

    $query = "SELECT * FROM user WHERE username = '$username'";
    $result = mysqli_query($con, $query);     // 执行查询操作
    if($row = mysqli_fetch_array($result)){
        echo "用户名已存在";
    }else{
        $query = "INSERT INTO `user`(`username`, `password`) VALUES ('$username','$password')";
        $result = mysqli_query($con, $query);     // 执行查询操作
        echo "新用户创建成功";
    }

}

mysqli_close($con);

