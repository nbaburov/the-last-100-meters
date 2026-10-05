package nl.fontys.s3.backend.business.impl;

import nl.fontys.s3.backend.business.FloorService;
import nl.fontys.s3.backend.business.MapValidator;
import nl.fontys.s3.backend.domain.enums.BuildPieces;
import nl.fontys.s3.backend.domain.Floor;
import nl.fontys.s3.backend.domain.Map;
import org.springframework.stereotype.Service;

@Service
public class MapValidatorImpl implements MapValidator {
    private final FloorService floorService;

    public MapValidatorImpl(FloorService floorService) {
        this.floorService = floorService;
    }

    @Override
    public boolean checkEndPosition(Map map, int floorIndex, int row, int col) {
        try {
            Floor floor = map.getFloors().get(floorIndex);
            BuildPieces position = floorService.getPosition(floor, row, col);
            return position == BuildPieces.EMPTY || position == BuildPieces.END; // Allow targeting the END position.
        } catch (IndexOutOfBoundsException e) {
            return false; // Out of bounds is invalid.
        }
    }

    @Override
    public boolean checkNextPosition(Floor floor, int row, int col) {
        try {
            BuildPieces position = floorService.getPosition(floor, row, col);
            return position != BuildPieces.WALL; // Valid if not a wall
        } catch (IndexOutOfBoundsException e) {
            return false; // Invalid position
        }
    }
}
