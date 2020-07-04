CREATE TABLE `filelist`
(
    `id`         int           NOT NULL AUTO_INCREMENT,
    `filename`   varchar(225)  NOT NULL,
    `fileurl`    varchar(1024) NOT NULL,
    `minio_path` varchar(1024) DEFAULT NULL,
    `category`   varchar(255)  DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8