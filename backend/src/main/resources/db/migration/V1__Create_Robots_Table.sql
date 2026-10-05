CREATE TABLE robots
(
    id     BIGINT AUTO_INCREMENT NOT NULL,
    status VARCHAR(255)          NOT NULL,
    CONSTRAINT pk_robots PRIMARY KEY (id)
);