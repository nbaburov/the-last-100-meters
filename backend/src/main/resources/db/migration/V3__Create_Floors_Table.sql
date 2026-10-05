CREATE TABLE floors
(
    id          BIGINT AUTO_INCREMENT NOT NULL,
    row_num     INT                   NOT NULL,
    col_num     INT                   NOT NULL,
    floor_num   INT                   NOT NULL,
    floor_map   TEXT                  NULL,
    map_id      BIGINT                NULL,
    floor_order INT                   NULL,
    CONSTRAINT pk_floors PRIMARY KEY (id)
);

ALTER TABLE floors
    ADD CONSTRAINT FK_FLOORS_ON_MAP FOREIGN KEY (map_id) REFERENCES maps (id);