package nl.fontys.s3.backend.controller;

import lombok.RequiredArgsConstructor;
import nl.fontys.s3.backend.business.MapSolver;
import nl.fontys.s3.backend.business.PackageService;
import nl.fontys.s3.backend.controller.converter.PackageConverter;
import nl.fontys.s3.backend.controller.dto.responses.PackageResponseDto;
import nl.fontys.s3.backend.domain.Map;
import nl.fontys.s3.backend.domain.Parcel;
import nl.fontys.s3.backend.persistance.MapRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/packages")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173/")
public class PackageController {

    private final PackageService packageService;
    private final MapSolver mapSolver;
    private final MapRepository repo;

    @PostMapping("{barcode}")
    public ResponseEntity<PackageResponseDto> createPackage(@PathVariable String barcode) {
        Parcel parcel = packageService.createPackage(barcode);
        PackageResponseDto responseDto = PackageConverter.parcelToResponseDto(parcel);
        return ResponseEntity.ok().body(responseDto);
    }

    @GetMapping("{id}")
    public ResponseEntity<PackageResponseDto> getPackage(@PathVariable long id){
        Parcel parcel = packageService.getPackage(id);
        PackageResponseDto responseDto = PackageConverter.parcelToResponseDto(parcel);

        if (parcel.getOwner() != null) {
            Map map = repo.getMap(1); // This could be dynamically determined or fetched from a configuration
            String solvedPath = mapSolver.solveMap(map,
                    parcel.getOwner().getEndFloorIndex(),
                    parcel.getOwner().getEndRow(),
                    parcel.getOwner().getEndCol());
            responseDto.setSolvedMapPath(solvedPath);
        }

        return ResponseEntity.ok().body(responseDto);
    }


    @PutMapping("{id}")
    public ResponseEntity<Void> updatePackageArrived(@PathVariable long id){
        packageService.updatePackageArrived(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deletePackage(@PathVariable long id){
        packageService.deletePackage(id);
        return ResponseEntity.noContent().build();
    }

    //Allow use once the rest of the app is working fine
    /*
    @PutMapping("/locker/{id}")
    public ResponseEntity<> moveToLocker(@PathVariable long id){
        //TODO: implement
        return null;
    }
     */
}
