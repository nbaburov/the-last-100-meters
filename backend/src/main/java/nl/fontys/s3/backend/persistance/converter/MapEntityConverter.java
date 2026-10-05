package nl.fontys.s3.backend.persistance.converter;

import nl.fontys.s3.backend.domain.Floor;
import nl.fontys.s3.backend.domain.Map;
import nl.fontys.s3.backend.persistance.entity.FloorEntity;
import nl.fontys.s3.backend.persistance.entity.MapEntity;

public class MapEntityConverter {

    public static MapEntity toEntity(Map map) {
        return MapEntity.builder().id(map.getId())
                .dockingStations(map.getDockingStations())
                .floors(map.getFloors() == null ? null:
                        map.getFloors().stream()
                                .map(MapEntityConverter::toEntity)
                                .toList()
                )
                .build();
    }

    public static Map toDomain(MapEntity mapEntity) {
        return Map.builder().id(mapEntity.getId())
                .dockingStations(mapEntity.getDockingStations())
                .floors(mapEntity.getFloors() == null ? null:
                                mapEntity.getFloors().stream()
                                        .map(MapEntityConverter::toDomain)
                                        .toList()
                )
                .build();
    }

    private static FloorEntity toEntity(Floor floor) {
        return FloorEntity.builder().id(floor.getId())
                .colNum(floor.getColNumber())
                .rowNum(floor.getRowNumber())
                .floorMap(floor.getFloorMap())
                .build();
    }

    private static Floor toDomain(FloorEntity floorEntity) {
        return Floor.builder().id(floorEntity.getId())
                .colNumber(floorEntity.getColNum())
                .rowNumber(floorEntity.getRowNum())
                .floorMap(floorEntity.getFloorMap())
                .build();
    }
}
