package nl.fontys.s3.backend.business;

import nl.fontys.s3.backend.domain.Map;

public interface MapSolver {
    String solveMap(Map map, int floorIndex, int endRow, int endCol);

}
