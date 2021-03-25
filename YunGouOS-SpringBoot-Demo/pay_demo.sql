/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50644
Source Host           : localhost:3306
Source Database       : pay_demo

Target Server Type    : MYSQL
Target Server Version : 50644
File Encoding         : 65001

Date: 2021-02-24 20:32:35
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for pay_order
-- ----------------------------
DROP TABLE IF EXISTS `pay_order`;
CREATE TABLE `pay_order` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `order_no` varchar(255) NOT NULL,
  `body` varchar(255) NOT NULL,
  `money` varchar(255) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0' COMMENT '0：未支付、1：已支付',
  `pay_no` varchar(255) DEFAULT NULL,
  `pay_time` varchar(255) DEFAULT NULL,
  `add_time` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of pay_order
-- ----------------------------
INSERT INTO `pay_order` VALUES ('1', '1614160931320', '测试', '1', '0', null, null, '2021-02-24 18:02:11');
INSERT INTO `pay_order` VALUES ('2', '1614160989168', '测试', '1', '0', null, null, '2021-02-24 18:03:09');
INSERT INTO `pay_order` VALUES ('3', '1614161508578', '测试', '1', '0', null, null, '2021-02-24 18:11:48');
INSERT INTO `pay_order` VALUES ('4', '1614161516607', '测试', '1', '0', null, null, '2021-02-24 18:11:56');
INSERT INTO `pay_order` VALUES ('5', '1614161689990', '1', '1', '0', null, null, '2021-02-24 18:14:49');
INSERT INTO `pay_order` VALUES ('6', '1614162118060', '1', '1', '0', null, null, '2021-02-24 18:21:58');
INSERT INTO `pay_order` VALUES ('7', '1614162259662', '1', '1', '0', null, null, '2021-02-24 18:24:19');
INSERT INTO `pay_order` VALUES ('8', '1614162311558', '1', '1', '0', null, null, '2021-02-24 18:25:11');
INSERT INTO `pay_order` VALUES ('9', '1614162459967', '1', '1', '0', null, null, '2021-02-24 18:27:39');
INSERT INTO `pay_order` VALUES ('10', '1614162974490', '1', '1', '1', '4200000895202102249803763952', '2021-02-24 18:36:23', '2021-02-24 18:36:14');
