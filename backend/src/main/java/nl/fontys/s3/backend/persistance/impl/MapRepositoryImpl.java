package nl.fontys.s3.backend.persistance.impl;

import lombok.RequiredArgsConstructor;
import nl.fontys.s3.backend.domain.Map;
import nl.fontys.s3.backend.persistance.MapRepository;
import nl.fontys.s3.backend.persistance.converter.MapEntityConverter;
import nl.fontys.s3.backend.persistance.entity.FloorEntity;
import nl.fontys.s3.backend.persistance.entity.MapEntity;
import nl.fontys.s3.backend.persistance.jpa.FloorJpaRepo;
import nl.fontys.s3.backend.persistance.jpa.MapJpaRepo;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MapRepositoryImpl implements MapRepository {

    private final MapJpaRepo mapJpaRepo;
    private final FloorJpaRepo floorJpaRepo;

    @Override
    public void updateMap(Map map) {
        MapEntity newValues = MapEntityConverter.toEntity(map);
        List<FloorEntity> newSavedFloors = newValues.getFloors();
        for (int i = 0; i < newSavedFloors.size(); i++) {
            newSavedFloors.get(i).setFloorNum(i);
        }
        floorJpaRepo.deleteAll();
        MapEntity saved = mapJpaRepo.findById(map.getId()).get();
        saved.setDockingStations(newValues.getDockingStations());
        saved = mapJpaRepo.save(saved);
        for (FloorEntity floor : newSavedFloors) {
            floor.setParentMap(saved);
            floorJpaRepo.save(floor);
        }
    }

    @Override
    public Map getMap(long id) {
        return MapEntityConverter.toDomain(mapJpaRepo.findById(id).get());
    }
}
