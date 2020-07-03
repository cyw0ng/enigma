CREATE TABLE `cwelist`
(
    `id`            int           NOT NULL AUTO_INCREMENT,
    `cweId`         int unsigned  NOT NULL,
    `description`   varchar(4096) NOT NULL,
    `name`          varchar(225)   NOT NULL,
    `relationships` varchar(1024) NOT NULL,
    `status`        varchar(45)   NOT NULL,
    `weaknessabs`   varchar(45)   NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `cweId_UNIQUE` (`cweId`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8