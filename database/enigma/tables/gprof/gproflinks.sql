CREATE TABLE `gproflinks`
(
    `id`          int         NOT NULL,
    `projectId`   varchar(45) NOT NULL,
    `type`        varchar(45) NOT NULL,
    `name`        varchar(45) NOT NULL,
    `startnodeId` int         NOT NULL,
    `endnodeId`   int         NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8