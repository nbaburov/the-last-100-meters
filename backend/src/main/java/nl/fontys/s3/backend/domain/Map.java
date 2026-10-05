package nl.fontys.s3.backend.domain;

import nl.fontys.s3.backend.domain.enums.BuildPieces;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Map {
    private long id;
    private List<Floor> floors;
    private List<Integer> dockingStations;
    public static final String directions = "DULR";
    public static final int[] drow = {1, -1, 0, 0}; // Down, Up, Left, Right row changes
    public static final int[] dcol = {0, 0, -1, 1};

}
