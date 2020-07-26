CREATE TABLE `gprofprojects`
(
    `id`                 int          NOT NULL AUTO_INCREMENT,
    `projectId`          varchar(225) NOT NULL,
    `name`               varchar(225) NOT NULL,
    `created_time`       varchar(45)  NOT NULL,
    `last_modified_time` varchar(45)  NOT NULL DEFAULT '0',
    `is_readonly`        tinyint      NOT NULL DEFAULT '0',
    `namespace`          varchar(45)  NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8