-- Demo data: a two-floor office with one docking station, an elevator, five employees and three robots.
INSERT INTO maps (id) VALUES (1);
INSERT INTO map_entity_docking_stations (map_entity_id, docking_stations) VALUES (1, 0);
INSERT INTO floors (row_num, col_num, floor_num, floor_map, map_id, floor_order) VALUES
  (6, 8, 0, '[["WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL"], ["WALL", "STATION", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "ELEVATOR", "WALL"], ["WALL", "EMPTY", "WALL", "WALL", "EMPTY", "WALL", "EMPTY", "WALL"], ["WALL", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "WALL"], ["WALL", "EMPTY", "WALL", "EMPTY", "WALL", "WALL", "EMPTY", "WALL"], ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL"]]', 1, 0),
  (6, 8, 1, '[["WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL"], ["WALL", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "ELEVATOR", "WALL"], ["WALL", "EMPTY", "WALL", "WALL", "WALL", "WALL", "EMPTY", "WALL"], ["WALL", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "WALL"], ["WALL", "EMPTY", "WALL", "EMPTY", "WALL", "WALL", "WALL", "WALL"], ["WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL", "WALL"]]', 1, 1);
INSERT INTO employees (first_name, last_name, email, card_barcode, photo, end_floor_index, end_row, end_col) VALUES
  ('Alice', 'Jansen', 'alice@example.com', '1000001', 'https://randomuser.me/api/portraits/women/44.jpg', 0, 3, 3),
  ('Bob', 'de Vries', 'bob@example.com', '1000002', 'https://randomuser.me/api/portraits/men/32.jpg', 0, 4, 1),
  ('Charlie', 'Bakker', 'charlie@example.com', '1000003', 'https://randomuser.me/api/portraits/men/45.jpg', 1, 3, 1),
  ('David', 'Visser', 'david@example.com', '1000004', 'https://randomuser.me/api/portraits/men/12.jpg', 1, 1, 2),
  ('Eve', 'Smit', 'eve@example.com', '1000005', 'https://randomuser.me/api/portraits/women/68.jpg', 1, 3, 5);
INSERT INTO robots (status) VALUES ('IDLE'), ('IDLE'), ('IDLE');
