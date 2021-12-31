<?php
header("Content-Type: text/html;charset=utf8");// 设置页面显示的文字编码
header('Access-Control-Allow-Origin: *');//可解决跨域问题
$con = mysqli_connect("localhost", "root", "123"); // 连接数据库
mysqli_query($con, "set names 'utf8'");//设置数据库的编码方式

$building = $_GET["building"];
$floor = $_GET["floor"];
$sittype = $_GET["sittype"];
$date = $_GET['date'];

echo "{";
if ($con) {
    mysqli_select_db($con, "room"); // 选择要使用的数据库mydatabase

    $query = "SELECT * FROM location WHERE building = '$building' AND floor = '$floor' AND sittype = '$sittype' AND date = '$date'";
    $result = mysqli_query($con, $query);     // 执行查询操作
    if($row = mysqli_fetch_array($result)){
        echo '"open":';
        echo $row['open'];
        echo ',"sit":';
        echo $row['sit'];
    }else{
        echo '"open":';
        echo 0;
        echo ',"sit":';
        echo '[]';
    }
}

echo "}";
mysqli_close($con);

