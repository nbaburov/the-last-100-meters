package nl.fontys.s3.backend.business.impl;

import nl.fontys.s3.backend.business.FloorService;
import nl.fontys.s3.backend.domain.enums.BuildPieces;
import nl.fontys.s3.backend.domain.Floor;
import org.springframework.stereotype.Service;

@Service
public class FloorServiceImpl implements FloorService {
    public BuildPieces getPosition(Floor floor, int row, int col) {
        if (row < 0 || row >= floor.getRowNumber() || col < 0 || col >= floor.getColNumber()) {
            throw new IndexOutOfBoundsException("Position is out of bounds.");
        }
        return floor.getFloorMap()[row][col];
    }

    public void setPosition(Floor floor, int row, int col, BuildPieces piece) {
        if (row < 0 || row >= floor.getRowNumber() || col < 0 || col >= floor.getColNumber()) {
            throw new IndexOutOfBoundsException("Position is out of bounds.");
        }
        floor.getFloorMap()[row][col] = piece;
    }
}
