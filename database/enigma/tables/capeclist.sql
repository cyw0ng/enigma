CREATE TABLE `capeclist`
(
    `id`               int          NOT NULL AUTO_INCREMENT,
    `name`             varchar(225) NOT NULL,
    `prerequisites`    varchar(2048) DEFAULT NULL,
    `related_weakness` varchar(225)  DEFAULT NULL,
    `solutions`        varchar(2048) DEFAULT NULL,
    `summary`          varchar(2048) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8