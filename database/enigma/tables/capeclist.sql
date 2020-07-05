CREATE TABLE `capeclist`
(
    `id`                   int          NOT NULL AUTO_INCREMENT,
    `name`                 varchar(225) NOT NULL,
    `prerequisites`        varchar(2048) DEFAULT NULL,
    `related_weakness`     varchar(225)  DEFAULT NULL,
    `description`          varchar(2048) DEFAULT NULL,
    `likelihood_of_attack` varchar(45)   DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 652
  DEFAULT CHARSET = utf8