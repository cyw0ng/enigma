CREATE TABLE `productlist` (
  `id` int NOT NULL,
  `productName` varchar(225) NOT NULL,
  `vendorName` varchar(225) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `vendoeName_idx` (`vendorName`),
  CONSTRAINT `vendorName` FOREIGN KEY (`vendorName`) REFERENCES `vendorlist` (`vendorName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
