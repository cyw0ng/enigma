CREATE TABLE `gprofnodes`
(
    `id`        int         NOT NULL,
    `projectId` varchar(45) NOT NULL,
    `type`      varchar(45) NOT NULL,
    `name`      varchar(45) NOT NULL,
    `parent`    varchar(45) NOT NULL,
    `xpos`      float       NOT NULL,
    `ypos`      float       NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8