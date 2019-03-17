/*
 Navicat Premium Data Transfer

 Source Server         : ayf
 Source Server Type    : MySQL
 Source Server Version : 100136
 Source Host           : localhost:3306
 Source Schema         : shares

 Target Server Type    : MySQL
 Target Server Version : 100136
 File Encoding         : 65001

 Date: 17/03/2019 16:44:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for articlepraise
-- ----------------------------
DROP TABLE IF EXISTS `articlepraise`;
CREATE TABLE `articlepraise`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_id` int(11) DEFAULT NULL,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Compact;

-- ----------------------------
-- Records of articlepraise
-- ----------------------------
INSERT INTO `articlepraise` VALUES (41, 80, '妖枫枫');

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `title` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `msg` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `praise` int(10) NOT NULL DEFAULT 0,
  `upload_time` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 81 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Compact;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES (66, '妖枫枫', '这是一条测试标题', '1.用户注册：判断重名，验证码验证，验证EMAIL格式，验证手机号长度，至少要有用户名和密码字段。（4分）&nbsp;2.用户登录：有验证码验证。（3分）&nbsp;3.内容分享：已登录用户可以发布自己的图文<div><br></div><img class=\"img_insert\" src=\"upLoadFile/妖枫枫/154606891259970.jpg\"><div>分享，文字不超过200中文字，支持最多3张图片上传，对宽度大于1000PX的图片进行缩放保存。（6分）1.用户注册：判断重名，）<br></div><img class=\"img_insert\" src=\"upLoadFile/妖枫枫/154606893481930.png\">', 0, '2018-12-29 15:35');
INSERT INTO `articles` VALUES (80, '妖枫枫', '南麂岛', '<span style=\"color: rgb(51, 51, 51); font-family: arial, 宋体, sans-serif; font-size: 14px; text-indent: 28px;\">南麂岛，</span><a target=\"_blank\" href=\"https://baike.baidu.com/item/%E5%9B%BD%E5%AE%B6%E7%BA%A7%E8%87%AA%E7%84%B6%E4%BF%9D%E6%8A%A4%E5%8C%BA/7516695\" data-lemmaid=\"7516695\" style=\"color: rgb(19, 110, 194); font-family: arial, 宋体, sans-serif; font-size: 14px; text-indent: 28px;\">国家级自然保护区</a><span style=\"color: rgb(51, 51, 51); font-family: arial, 宋体, sans-serif; font-size: 14px; text-indent: 28px;\">，中国最美海岛，国家</span><a target=\"_blank\" href=\"https://baike.baidu.com/item/4A%E7%BA%A7%E6%99%AF%E5%8C%BA\" style=\"color: rgb(19, 110, 194); font-family: arial, 宋体, sans-serif; font-size: 14px; text-indent: 28px;\">4A级景区</a><span style=\"color: rgb(51, 51, 51); font-family: arial, 宋体, sans-serif; font-size: 14px; text-indent: 28px;\">别名海山，古代又写作“南己山”，其位于浙江省</span><a target=\"_blank\" href=\"https://baike.baidu.com/item/%E5%B9%B3%E9%98%B3%E5%8E%BF/82447\" data-lemmaid=\"82447\" style=\"color: rgb(19, 110, 194); font-family: arial, 宋体, sans-serif; font-size: 14px; text-indent: 28px;\">平阳县</a><span style=\"color: rgb(51, 51, 51); font-family: arial, 宋体, sans-serif; font-size: 14px; text-indent: 28px;\">鳌江口外30海里的</span><a target=\"_blank\" href=\"https://baike.baidu.com/item/%E4%B8%9C%E6%B5%B7/18322\" data-lemmaid=\"18322\" style=\"color: rgb(19, 110, 194); font-family: arial, 宋体, sans-serif; font-size: 14px; text-indent: 28px;\">东海</a><span style=\"color: rgb(51, 51, 51); font-family: arial, 宋体, sans-serif; font-size: 14px; text-indent: 28px;\">海面上，距市区50海里。是一座旅游岛屿 ，南麂岛是</span><a target=\"_blank\" href=\"https://baike.baidu.com/item/%E5%8D%97%E9%BA%82%E5%88%97%E5%B2%9B/649996\" data-lemmaid=\"649996\" style=\"color: rgb(19, 110, 194); font-family: arial, 宋体, sans-serif; font-size: 14px; text-indent: 28px;\">南麂列岛</a><span style=\"color: rgb(51, 51, 51); font-family: arial, 宋体, sans-serif; font-size: 14px; text-indent: 28px;\">52个岛屿中最大的岛屿</span><div><span style=\"color: rgb(51, 51, 51); font-family: arial, 宋体, sans-serif; font-size: 14px; text-indent: 28px;\"><br></span></div><img class=\"img_insert\" src=\"upLoadFile/妖枫枫/154648216591070.jpg\"><div>等着爸爸回家的原住民 蔡成杰</div><img class=\"img_insert\" src=\"upLoadFile/妖枫枫/154648231287225.jpg\"><div>这里风景秀丽环境优美欢迎前来观光旅游投资</div><img class=\"img_insert\" src=\"upLoadFile/妖枫枫/154648237860566.jpg\">', 1, '2019-01-03 10:26');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_id` int(11) DEFAULT NULL,
  `replyer` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `time_reply` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `msg` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `to_sb` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `stars` int(10) DEFAULT 0,
  `replyer_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Compact;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES (5, 66, '妖枫枫', '2018-12-30 12:23', '我是妖风呀', NULL, 0, NULL);
INSERT INTO `comments` VALUES (21, 66, '妖枫枫', '2019-01-02 06:37', '写得好', NULL, 0, NULL);
INSERT INTO `comments` VALUES (33, 80, '妖枫枫', '2019-01-03 03:29', '蔡呈杰不想说话', NULL, 0, NULL);
INSERT INTO `comments` VALUES (34, 66, '妖枫枫', '2019-01-03 10:42', '测试时间', NULL, 0, NULL);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Compact;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (22, '妖枫枫', '202cb962ac59075b964b07152d234b70', '13@qq.com', '15258670505');
INSERT INTO `users` VALUES (23, '宝亲亲', '202cb962ac59075b964b07152d234b70', '13@qq.com', '15258670501');
INSERT INTO `users` VALUES (24, 'kk', '202cb962ac59075b964b07152d234b70', '123@qq.com', '15058713738');

-- ----------------------------
-- Triggers structure for table articlepraise
-- ----------------------------
DROP TRIGGER IF EXISTS `addArticleStars`;
delimiter ;;
CREATE DEFINER = `root`@`localhost` TRIGGER `addArticleStars` AFTER INSERT ON `articlepraise` FOR EACH ROW begin

UPDATE articles SET praise = praise + 1 WHERE articles.id = new.article_id;
end
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table articlepraise
-- ----------------------------
DROP TRIGGER IF EXISTS `reduceArticleStars`;
delimiter ;;
CREATE DEFINER = `root`@`localhost` TRIGGER `reduceArticleStars` AFTER DELETE ON `articlepraise` FOR EACH ROW begin
UPDATE articles SET praise = praise - 1 WHERE articles.id = old.article_id;
end
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
