<?php

//用户预定座位

header("Content-Type: text/html;charset=utf8");// 设置页面显示的文字编码
header('Access-Control-Allow-Origin: *');//可解决跨域问题
$con = mysqli_connect("localhost", "root", "123"); // 连接数据库
mysqli_query($con, "set names 'utf8'");//设置数据库的编码方式

$sit_index = $_GET["sit_index"];
$time_index = $_GET["time_index"];
$username = $_GET["username"];
$building = $_GET["building"];
$floor = $_GET["floor"];
$sittype = $_GET["sittype"];
$date = $_GET['date'];

//$sit_index = 0;
//$time_index = 0;
//$username = '1';
//$building = '图书馆';
//$floor = '4F';
//$sittype = '电脑座位';
//$date = '2021-12-13';

if ($con) {
    mysqli_select_db($con, "room"); // 选择要使用的数据库mydatabase
    //查询该教学楼、楼层、教师类型、日期的座位预约情况
    $query = "SELECT * FROM location WHERE building = '$building' AND floor = '$floor' AND sittype = '$sittype' AND date = '$date'";
    $result = mysqli_query($con, $query);     // 执行查询操作
    $row = mysqli_fetch_array($result);     //获取结果
    $a = $row['sit'];
    $a = json_decode($a);//json字符串转为数组
    if($a[$time_index][$sit_index] == "Y"){//如果预定的座位详情为Y，则可预订
        //查询该用户在当前日期、时段是否有过预约
        $query1 = "SELECT * FROM orders WHERE date = '$date' AND time_index = '$time_index'";
        $result1 = mysqli_query($con, $query1);     // 执行查询操作
        if($row1 = mysqli_fetch_array($result1)){
            //拼出用户预约信息的字符串返回给小程序
            echo "您已在当前时段有过预约，";
            echo $row1['building'] . $row1['floor'] . $row1['sittype'];
            echo "座位号：".($row1['sit_index'] + 1 );
            echo "。请勿浪费资源！";
        }else{
            //没有预约则把该座位换成N，表示已有人预约
            $a[$time_index][$sit_index] = "N";
            $a = json_encode($a);//将数组重新转为json格式的字符串
            //将用户预约次数+1
            $query1 = "UPDATE `user` SET `number`= number + 1 WHERE username = '$username'";
            $result1 = mysqli_query($con, $query1);     // 执行查询操作
            //将更新后的座位详情插入数据库
            $query1 = "UPDATE `location` SET `sit`='$a' WHERE `building`='$building' AND `floor`='$floor' AND `sittype`='$sittype' AND `date`='$date'";
            $result1 = mysqli_query($con, $query1);     // 执行查询操作
            //新增预定信息存入orders表
            $query1 = "INSERT INTO `orders`(`building`, `floor`, `sittype`, `time_index`, `sit_index`, `date`, `username`) VALUES ('$building','$floor','$sittype','$time_index','$sit_index','$date','$username')";
            $result1 = mysqli_query($con, $query1);     // 执行查询操作
            echo "预约成功！";//返回给小程序
        }
    }else{//否则不可预订
        echo "座位已被预定！";//返回给小程序
    }
}

mysqli_close($con);

