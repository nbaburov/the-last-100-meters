CREATE TABLE packages
(
    id            BIGINT AUTO_INCREMENT NOT NULL,
    `description` VARCHAR(255)          NULL,
    weight        INT                   NOT NULL,
    height        INT                   NOT NULL,
    width         INT                   NOT NULL,
    length        INT                   NOT NULL,
    status        VARCHAR(255)          NOT NULL,
    empl_id       BIGINT                NOT NULL,
    robot_id      BIGINT                NULL,
    CONSTRAINT pk_packages PRIMARY KEY (id)
);

ALTER TABLE packages
    ADD CONSTRAINT uc_packages_robot UNIQUE (robot_id);

ALTER TABLE packages
    ADD CONSTRAINT FK_PACKAGES_ON_EMPL FOREIGN KEY (empl_id) REFERENCES employees (empl_id);

ALTER TABLE packages
    ADD CONSTRAINT FK_PACKAGES_ON_ROBOT FOREIGN KEY (robot_id) REFERENCES robots (id);