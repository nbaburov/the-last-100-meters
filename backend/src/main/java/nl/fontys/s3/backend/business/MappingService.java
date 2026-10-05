package nl.fontys.s3.backend.business;

import nl.fontys.s3.backend.domain.Map;

public interface MappingService {
    void updateMap(Map map);
    Map getMap(long id);
    String getMapSolution(long id, int floor, int row, int col);
}
