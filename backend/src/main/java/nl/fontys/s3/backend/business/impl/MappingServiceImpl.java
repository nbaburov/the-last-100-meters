package nl.fontys.s3.backend.business.impl;

import lombok.RequiredArgsConstructor;
import nl.fontys.s3.backend.business.MappingService;
import nl.fontys.s3.backend.business.MapSolver;
import nl.fontys.s3.backend.domain.Map;
import nl.fontys.s3.backend.persistance.MapRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MappingServiceImpl implements MappingService {

    private final MapRepository repo;
    private final MapSolver mapSolver;

    @Override
    public void updateMap(Map map) {
        repo.updateMap(map);
    }

    @Override
    public Map getMap(long id) {
        return repo.getMap(id);
    }

    @Override
    public String getMapSolution(long id, int floorIndex, int endRow, int endCol) {
        // Retrieve the map by ID
        Map map = repo.getMap(id);
        if (map == null) {
            throw new IllegalArgumentException("Map not found with id: " + id);
        }

        // Validate the floor index
        if (floorIndex < 0 || floorIndex >= map.getFloors().size()) {
            throw new IllegalArgumentException("Invalid floor index: " + floorIndex);
        }

        // Solve the map for the specified floor and position
        return mapSolver.solveMap(map, floorIndex, endRow, endCol);
    }
}
