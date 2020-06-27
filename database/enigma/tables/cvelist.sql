CREATE TABLE `cvelist`
(
    `id`              int         NOT NULL AUTO_INCREMENT,
    `cve-id`          varchar(45) NOT NULL,
    `modified`        datetime    NOT NULL,
    `published`       datetime    NOT NULL,
    `assigner`        varchar(45) NOT NULL,
    `cwe`             varchar(45) NOT NULL,
    `cvss-time`       datetime    NOT NULL,
    `cvss-vector`     varchar(45) NOT NULL,
    `cvss`            varchar(45) NOT NULL,
    `fav-category-id` int DEFAULT NULL,
    `fav-importance`  int DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `cveId_UNIQUE` (`cve-id`),
    UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8