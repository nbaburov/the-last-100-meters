package nl.fontys.s3.backend.business;

import nl.fontys.s3.backend.domain.enums.BuildPieces;
import nl.fontys.s3.backend.domain.Floor;

public interface FloorService {
    BuildPieces getPosition(Floor floor, int row, int col);
    void setPosition(Floor floor, int row, int col, BuildPieces position);
}
