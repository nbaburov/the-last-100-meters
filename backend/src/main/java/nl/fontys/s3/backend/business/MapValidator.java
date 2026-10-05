package nl.fontys.s3.backend.business;

import nl.fontys.s3.backend.domain.Floor;
import nl.fontys.s3.backend.domain.Map;

public interface MapValidator {
    boolean checkEndPosition(Map map, int floorIndex, int row, int col);
    boolean checkNextPosition(Floor floor, int row, int col);
}
