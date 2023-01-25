CREATE DATABASE dokandari;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone_number` varchar(50) DEFAULT NULL,
  `user_type` varchar(50) DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `date_added` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `date_updated` DATETIME ON UPDATE CURRENT_TIMESTAMP,
  `resetToken` varchar(100) ,
  `resetTokenExpire` DATETIME ,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `users` ADD filePath TEXT;

CREATE TABLE `shops` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(100) DEFAULT NULL,
  `email`varchar(100) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `market` varchar(100) NOT NULL,
  `shopType` varchar(100) NOT NULL,
  `filePath` TEXT ,
  `shopName` varchar(100) NOT NULL,
  `shopPhone` varchar(100) NOT NULL,
  `shopAddress` varchar(100) NOT NULL,
  `openTime` varchar(100) NOT NULL,
  `closeTime` varchar(100) NOT NULL,
  `resetToken` varchar(100) ,
  `resetTokenExpire` DATETIME ,
  `date_added` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `date_updated` DATETIME ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `followers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `followerId` int DEFAULT NULL,
  `followingId` int DEFAULT NULL,
  `followerType` varchar(20) NOT NULL,
  `date_added` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `date_updated` DATETIME ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `notices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `shopId` int DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `details` TEXT,
  `date_added` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `date_updated` DATETIME ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `price` int,
  `type` varchar(20) DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `shopId` int DEFAULT NULL,
  `file1` TEXT DEFAULT NULL,
  `file2` TEXT DEFAULT NULL,
  `file3` TEXT DEFAULT NULL,
  `file4` TEXT DEFAULT NULL,
  `date_added` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `date_updated` DATETIME ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
