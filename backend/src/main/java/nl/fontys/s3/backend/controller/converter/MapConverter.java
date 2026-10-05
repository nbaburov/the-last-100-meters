package nl.fontys.s3.backend.controller.converter;

import nl.fontys.s3.backend.controller.dto.requests.UpdateMapRequest;
import nl.fontys.s3.backend.controller.dto.responses.MapResponseDto;
import nl.fontys.s3.backend.domain.enums.BuildPieces;
import nl.fontys.s3.backend.domain.Floor;
import nl.fontys.s3.backend.domain.Map;

import java.util.ArrayList;
import java.util.List;

public class MapConverter {

    // Private constructor to prevent instantiation
    private MapConverter() {}

    /**
     * Converts a CreateMapRequest into a Map object.
     *
     * @param request The request object containing the map data.
     * @return A new Map object.
     */
    public static Map requestToMap(UpdateMapRequest request) {
        Character[][][] mapData = request.getMap();

        if (mapData == null || mapData.length == 0) {
            throw new IllegalArgumentException("Map data cannot be empty");
        }

        List<Floor> floors = new ArrayList<>();
        boolean hasDockingStation = false;
        List<Integer> dockingStations = new ArrayList<>();

        for (int floorIndex = 0; floorIndex < mapData.length; floorIndex++) {
            Character[][] floorData = mapData[floorIndex];
            int rows = floorData.length;
            int cols = floorData[0].length;
            BuildPieces[][] buildMap = new BuildPieces[rows][cols];

            for (int row = 0; row < rows; row++) {
                for (int col = 0; col < cols; col++) {
                    char cellValue = floorData[row][col];
                    BuildPieces buildPiece = BuildPieces.fromString(String.valueOf(cellValue));

                    if (buildPiece == null) {
                        throw new IllegalArgumentException("Invalid character in map at floor " + floorIndex +
                                ", row " + row + ", column " + col + ": " + cellValue);
                    }

                    buildMap[row][col] = buildPiece;

                    // Check for docking station
                    if (buildPiece == BuildPieces.STATION && !hasDockingStation) {
                        hasDockingStation = true;
                        dockingStations.add(floorIndex);
                    }
                }
            }

            floors.add(new Floor(0, rows, cols, buildMap));
        }

        if (!hasDockingStation) {
            throw new IllegalArgumentException("Map must contain at least one docking station");
        }

        // Build and return the Map object
        return Map.builder()
                .id(1) //Assume we only have one map
                .floors(floors) // Updated to handle multiple floors
                .dockingStations(dockingStations) // Placeholder for docking stations
                .build();
    }

    /**
     * Converts a Map object into a MapResponseDto.
     *
     * @param map The Map object to convert.
     * @return A MapResponseDto containing the map data.
     */
    public static MapResponseDto mapToDto(Map map) {
        List<Floor> floors = map.getFloors();
        if (floors == null || floors.isEmpty()) {
            throw new IllegalArgumentException("Map contains no floors");
        }

        int floorCount = floors.size();
        int rows = floors.get(0).getRowNumber();
        int cols = floors.get(0).getColNumber();
        Character[][][] mapArray = new Character[floorCount][rows][cols];

        for (int floorIndex = 0; floorIndex < floorCount; floorIndex++) {
            Floor floor = floors.get(floorIndex);

            for (int row = 0; row < rows; row++) {
                for (int col = 0; col < cols; col++) {
                    BuildPieces buildPiece = floor.getFloorMap()[row][col];

                    if (buildPiece == null) {
                        throw new IllegalArgumentException("Null BuildPiece found at floor " + floorIndex +
                                ", row " + row + ", column " + col);
                    }

                    // Convert BuildPieces to its character representation
                    mapArray[floorIndex][row][col] = buildPiece.getValue().charAt(0);
                }
            }
        }

        // Build and return the MapResponseDto
        MapResponseDto response = new MapResponseDto();
        response.setMap(mapArray);
        return response;
    }
}
