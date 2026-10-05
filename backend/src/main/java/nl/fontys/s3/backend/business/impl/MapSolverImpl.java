package nl.fontys.s3.backend.business.impl;

import nl.fontys.s3.backend.business.FloorService;
import nl.fontys.s3.backend.business.MapSolver;
import nl.fontys.s3.backend.business.MapValidator;
import nl.fontys.s3.backend.domain.enums.BuildPieces;
import nl.fontys.s3.backend.domain.Floor;
import nl.fontys.s3.backend.domain.Map;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;

@Service
public class MapSolverImpl implements MapSolver {
    private final FloorService floorService;
    private final MapValidator mapValidator;

    public MapSolverImpl(FloorService floorService, MapValidator mapValidator) {
        this.floorService = floorService;
        this.mapValidator = mapValidator;
    }

    @Override
    public String solveMap(Map map, int endFloorIndex, int endRow, int endCol) {
        if (endFloorIndex < 0 || endFloorIndex >= map.getFloors().size()) {
            throw new IllegalArgumentException("Invalid floor index.");
        }

        Floor endFloor = map.getFloors().get(endFloorIndex);

        // Validate end position
        if (!mapValidator.checkEndPosition(map, endFloorIndex, endRow, endCol)) {
            throw new IllegalArgumentException("Invalid end position.");
        }

        // Mark the end position
        floorService.setPosition(endFloor, endRow, endCol, BuildPieces.END);

        // Locate the starting station
        int startFloorIndex = map.getDockingStations().get(0); // Assuming one docking station
        Floor startFloor = map.getFloors().get(startFloorIndex);
        int[] startPosition = findTargetPosition(startFloor, BuildPieces.STATION);

        if (startPosition == null) {
            throw new IllegalStateException("No starting station found on the map.");
        }

        int startRow = startPosition[0];
        int startCol = startPosition[1];

        StringBuilder solution = new StringBuilder();

        if (startFloorIndex == endFloorIndex) {
            // Solve within the same floor
            solution.append(solveFloorPath(startFloor, startRow, startCol, endRow, endCol));
        } else {
            // Solve from start to elevator on the start floor
            int[] elevatorPosition = findTargetPosition(startFloor, BuildPieces.ELEVATOR);
            if (elevatorPosition == null) {
                throw new IllegalStateException("No elevator found on the starting floor.");
            }
            solution.append(solveFloorPath(startFloor, startRow, startCol, elevatorPosition[0], elevatorPosition[1]));

            // Add elevator movement between floors
            solution.append(moveBetweenFloors(startFloorIndex, endFloorIndex));

            // Solve from elevator to end position on the target floor
            elevatorPosition = findTargetPosition(endFloor, BuildPieces.ELEVATOR);
            if (elevatorPosition == null) {
                throw new IllegalStateException("No elevator found on the target floor.");
            }
            solution.append(solveFloorPath(endFloor, elevatorPosition[0], elevatorPosition[1], endRow, endCol));
        }

        // Unmark the end position
        floorService.setPosition(endFloor, endRow, endCol, BuildPieces.EMPTY);

        return solution.toString();
    }

    private String solveFloorPath(Floor floor, int startRow, int startCol, int targetRow, int targetCol) {
        StringBuilder path = new StringBuilder();
        ArrayList<String> result = new ArrayList<>();
        result.add(null);

        solveRecursive(floor, startRow, startCol, targetRow, targetCol, path, result);

        if (result.get(0) == null) {
            throw new IllegalStateException("No path found from start to target.");
        }

        return result.get(0);
    }

    private void solveRecursive(Floor floor, int row, int col, int targetRow, int targetCol, StringBuilder path, ArrayList<String> result) {
        // Base case: if we reach the target
        if (row == targetRow && col == targetCol) {
            result.set(0, path.toString());
            return;
        }

        // Check if the current path is already longer than a known valid path
        if (result.get(0) != null && path.length() >= result.get(0).length()) {
            return;
        }

        // Mark the current position as visited
        floorService.setPosition(floor, row, col, BuildPieces.WALL);

        for (int i = 0; i < Map.directions.length(); i++) {
            int nextRow = row + Map.drow[i];
            int nextCol = col + Map.dcol[i];

            if (mapValidator.checkNextPosition(floor, nextRow, nextCol)) {
                // Move to the next position
                path.append(Map.directions.charAt(i));
                solveRecursive(floor, nextRow, nextCol, targetRow, targetCol, path, result);
                // Backtrack
                path.deleteCharAt(path.length() - 1);
            }
        }

        // Unmark the current position
        floorService.setPosition(floor, row, col, BuildPieces.EMPTY);
    }

    private String moveBetweenFloors(int startFloorIndex, int endFloorIndex) {
        StringBuilder movement = new StringBuilder();
        if (startFloorIndex < endFloorIndex) {
            for (int i = startFloorIndex; i < endFloorIndex; i++) {
                movement.append("^"); // Elevator up
            }
        } else {
            for (int i = startFloorIndex; i > endFloorIndex; i--) {
                movement.append("v"); // Elevator down
            }
        }
        return movement.toString();
    }

    private int[] findTargetPosition(Floor floor, BuildPieces targetPiece) {
        for (int row = 0; row < floor.getRowNumber(); row++) {
            for (int col = 0; col < floor.getColNumber(); col++) {
                if (floorService.getPosition(floor, row, col) == targetPiece) {
                    return new int[]{row, col};
                }
            }
        }
        return null; // Target not found
    }
}