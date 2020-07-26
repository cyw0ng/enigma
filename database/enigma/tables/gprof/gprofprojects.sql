CREATE TABLE `gprofprojects`
(
    `id`            int          NOT NULL,
    `projectId`     varchar(225) NOT NULL,
    `name`          varchar(225) NOT NULL,
    `created`       varchar(45) DEFAULT NULL,
    `last_modified` varchar(45) DEFAULT NULL,
    `is_readonly`   tinyint     DEFAULT NULL,
    `namespace`     varchar(45) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8