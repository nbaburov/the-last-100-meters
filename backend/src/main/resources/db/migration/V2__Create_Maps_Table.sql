CREATE TABLE map_entity_docking_stations
(
    map_entity_id    BIGINT NOT NULL,
    docking_stations INT    NULL
);

CREATE TABLE maps
(
    id BIGINT AUTO_INCREMENT NOT NULL,
    CONSTRAINT pk_maps PRIMARY KEY (id)
);

ALTER TABLE map_entity_docking_stations
    ADD CONSTRAINT fk_mapentity_dockingstations_on_map_entity FOREIGN KEY (map_entity_id) REFERENCES maps (id);