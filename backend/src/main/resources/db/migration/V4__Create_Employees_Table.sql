CREATE TABLE employees
(
    empl_id         BIGINT AUTO_INCREMENT NOT NULL,
    first_name      VARCHAR(50)           NULL,
    last_name       VARCHAR(50)           NULL,
    email           VARCHAR(50)           NULL,
    card_barcode    VARCHAR(50)           NULL,
    photo           VARCHAR(100)          NULL,
    end_floor_index INT                   NULL,
    end_row         INT                   NULL,
    end_col         INT                   NULL,
    CONSTRAINT pk_employees PRIMARY KEY (empl_id)
);