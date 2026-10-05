package nl.fontys.s3.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nl.fontys.s3.backend.business.MappingService;
import nl.fontys.s3.backend.controller.converter.MapConverter;
import nl.fontys.s3.backend.controller.dto.requests.UpdateMapRequest;
import nl.fontys.s3.backend.controller.dto.requests.SolveMapRequest;
import nl.fontys.s3.backend.controller.dto.responses.MapResponseDto;
import nl.fontys.s3.backend.domain.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/maps")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173/")
public class MappingController {

    private final MappingService mappingService;

    @GetMapping("/solve/{id}")
    public ResponseEntity<String> solve(@PathVariable("id") long id, @Valid @RequestBody SolveMapRequest request) {
        return ResponseEntity.ok().body(mappingService.getMapSolution(id, request.getFloor(), request.getRow(), request.getCol()));
    }

    @GetMapping("{id}")
    public ResponseEntity<MapResponseDto> getMapping(@PathVariable("id") long id) {
        Map map = mappingService.getMap(id);
        MapResponseDto responseDto = MapConverter.mapToDto(map);
        return ResponseEntity.ok().body(responseDto);
    }

    @PutMapping
    public ResponseEntity<Void> updateMapping(@Valid @RequestBody UpdateMapRequest mapRequest) {
        mappingService.updateMap(MapConverter.requestToMap(mapRequest));
        return ResponseEntity.noContent().build();
    }
}
