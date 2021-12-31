-- phpMyAdmin SQL Dump
-- version 4.5.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2021-12-14 12:33:54
-- 服务器版本： 5.7.11
-- PHP Version: 7.0.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `room`
--

-- --------------------------------------------------------

--
-- 表的结构 `location`
--

CREATE TABLE `location` (
  `id` int(11) NOT NULL,
  `building` varchar(20) NOT NULL COMMENT '楼',
  `floor` varchar(5) NOT NULL COMMENT '楼层',
  `sittype` varchar(10) NOT NULL COMMENT '座位类型',
  `sit` varchar(5000) NOT NULL COMMENT '座位',
  `open` varchar(2) DEFAULT '1' COMMENT '开放',
  `date` date DEFAULT NULL COMMENT AS `日期`
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 表的结构 `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `building` varchar(20) DEFAULT NULL,
  `floor` varchar(20) DEFAULT NULL,
  `sittype` varchar(20) DEFAULT NULL,
  `time_index` varchar(5) DEFAULT NULL,
  `sit_index` varchar(5) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `number` int(11) NOT NULL DEFAULT '0',
  `infoType` varchar(20) NOT NULL DEFAULT 'student',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT AS `黑名单日期`
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `number`, `infoType`, `date`) VALUES
(9, 'admin', '1', 0, 'admin', '2021-12-14 05:44:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `location`
--
ALTER TABLE `location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- 使用表AUTO_INCREMENT `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
