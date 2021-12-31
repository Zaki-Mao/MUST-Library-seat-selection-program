<?php

//用户登录

header("Content-Type: text/html;charset=utf8");// 设置页面显示的文字编码
header('Access-Control-Allow-Origin: *');//可解决跨域问题
$con = mysqli_connect("localhost", "root", "123"); // 连接数据库
mysqli_query($con, "set names 'utf8'");//设置数据库的编码方式

$username = $_GET["username"];
$password = $_GET["password"];
$date = $_GET["date"];

echo "{";
if ($con) {
    mysqli_select_db($con, "room"); // 选择要使用的数据库mydatabase
    //查询用户名密码是否一致
    $query = "SELECT * FROM user WHERE username = '$username' AND password = '$password'";
    $result = mysqli_query($con, $query);     // 执行查询操作
    if($row = mysqli_fetch_array($result)){//if查到数据
        //拼出json格式的字符串传给小程序
        echo '"istrue":1,';
        echo '"username":"';
        echo $row['username'];
        echo '","number":';
        echo $row['number'];
        echo ',"infoType":"';
        echo $row['infoType'];
        echo '","date":"';
        echo $row['date'];
        echo '","orderinfo":[';
        //字符串中嵌入数组，查询这个用户今日所有预约
        $query1 = "SELECT * FROM orders WHERE username = '$username' AND date like '$date%'";
        $result1 = mysqli_query($con, $query1);     // 执行查询操作
        $i = 0;
        while ($row1 = mysqli_fetch_array($result1)){
            if($i == 0){$i = 1;}else{echo ',';}//用于判断中间的逗号
            echo '{"id":';
            echo $row1['id'];
            echo ',"building":"';
            echo $row1['building'];
            echo '","floor":"';
            echo $row1['floor'];
            echo '","sittype":"';
            echo $row1['sittype'];
            echo '","time_index":';
            echo $row1['time_index'];
            echo ',"sit_index":';
            echo $row1['sit_index'];
            echo ',"date":"';
            echo $row1['date'];
            echo '"}';
        }
        echo ']';

    }else{
        echo '"istrue":0';
    }


}

echo "}";
mysqli_close($con);

