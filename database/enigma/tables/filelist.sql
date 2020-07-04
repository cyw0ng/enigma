CREATE TABLE `filelist` (
                            `id` int NOT NULL AUTO_INCREMENT,
                            `filename` varchar(225) DEFAULT NULL,
                            `blob` longblob,
                            PRIMARY KEY (`id`),
                            UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8