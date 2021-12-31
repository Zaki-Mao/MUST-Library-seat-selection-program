<?php
header("Content-Type: text/html;charset=utf8");// 设置页面显示的文字编码
header('Access-Control-Allow-Origin: *');//可解决跨域问题
$con = mysqli_connect("localhost", "root", "123"); // 连接数据库
mysqli_query($con, "set names 'utf8'");//设置数据库的编码方式

$date = $_GET['date'];
//$date = '2021-12-14';
$array=[["building"=>"图书馆","floor"=>"1F","sittype"=>"mac座位","sit"=>"30"],
    ["building"=>"图书馆","floor"=>"1F","sittype"=>"电脑座位","sit"=>"45"],
    ["building"=>"图书馆","floor"=>"2F","sittype"=>"数据库电脑座位","sit"=>"10"],
    ["building"=>"图书馆","floor"=>"2F","sittype"=>"电脑座位","sit"=>"20"],
    ["building"=>"图书馆","floor"=>"2F","sittype"=>"普通座位","sit"=>"100"],
    ["building"=>"图书馆","floor"=>"2F","sittype"=>"电源座位","sit"=>"56"],
    ["building"=>"图书馆","floor"=>"3F","sittype"=>"单独座位","sit"=>"74"],
    ["building"=>"图书馆","floor"=>"3F","sittype"=>"电源座位","sit"=>"56"],
    ["building"=>"图书馆","floor"=>"3F","sittype"=>"普通座位","sit"=>"100"],
    ["building"=>"图书馆","floor"=>"4F","sittype"=>"电脑座位","sit"=>"58"],
    ["building"=>"图书馆","floor"=>"4F","sittype"=>"电源座位","sit"=>"56"],
    ["building"=>"图书馆","floor"=>"4F","sittype"=>"普通座位","sit"=>"100"],
    ["building"=>"自习室","floor"=>"1F","sittype"=>"电脑座位","sit"=>"10"],
    ["building"=>"自习室","floor"=>"1F","sittype"=>"电源座位","sit"=>"66"],
    ["building"=>"自习室","floor"=>"1F","sittype"=>"普通座位","sit"=>"150"],
    ["building"=>"自习室","floor"=>"1F","sittype"=>"单独座位","sit"=>"20"],];

if ($con) {
    mysqli_select_db($con, "room"); // 选择要使用的数据库mydatabase
    $query = "SELECT * FROM `location` WHERE date = '$date'";
    $result = mysqli_query($con, $query);
    if(mysqli_fetch_array($result)){
        echo '明日预约已开放，请勿重复开放！';
    }else{
        for($i = 0;$i < count($array);$i++){
            $building=$array[$i]['building'];
            $floor=$array[$i]['floor'];
            $sittype=$array[$i]['sittype'];
            $sit=a($array[$i]['sit']);
            $query = "INSERT INTO `location`(`building`, `floor`, `sittype`, `sit`, `date`) VALUES ('$building','$floor','$sittype','$sit','$date')";
            $result = mysqli_query($con, $query);
        }
        echo '开放成功！';
    }

}

function a($num){
    $p = "[";
    for($i = 0; $i < 3; $i++){
        if($i !=0){ $p = $p . ","; }
        $p = $p . "[";
        for($j = 0; $j < $num; $j++){
            if($j != 0){ $p = $p . ","; }
            $p = $p . '"Y"';
        }
        $p = $p . "]";
    }
    $p = $p . "]";
    return $p;
}
mysqli_close($con);

