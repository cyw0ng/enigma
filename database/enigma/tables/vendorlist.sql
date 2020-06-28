CREATE TABLE `vendorlist`
(
    `id`         int          NOT NULL,
    `vendorName` varchar(225) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `name_UNIQUE` (`vendorName`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;
