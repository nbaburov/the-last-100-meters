package nl.fontys.s3.backend.persistance.impl;

import lombok.RequiredArgsConstructor;
import nl.fontys.s3.backend.domain.Parcel;
import nl.fontys.s3.backend.persistance.converter.EmployeeEntityConverter;
import nl.fontys.s3.backend.persistance.PackageRepository;
import nl.fontys.s3.backend.persistance.converter.PackageEntityConverter;
import nl.fontys.s3.backend.persistance.entity.PackageEntity;
import nl.fontys.s3.backend.persistance.jpa.PackageJpaRepo;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class PackageRepositoryImpl implements PackageRepository {

    private final PackageJpaRepo packageJpaRepo;

    @Override
    public Parcel createPackage(Parcel parcel) {
        //No need to add a check for already existing entity, no need to be that robust on demo
        PackageEntity packageEntity = PackageEntityConverter.toEntity(parcel);
        packageEntity = packageJpaRepo.save(packageEntity);
        return PackageEntityConverter.toDomain(packageEntity);
    }

    @Override
    public Parcel getPackage(long id) {
        Optional<PackageEntity> packageEntity = packageJpaRepo.findById(id);
        if (packageEntity.isEmpty()) {
            //TODO: change for custom exception if needed
            throw new IllegalArgumentException("Package with id " + id + " not found");
        }
        return PackageEntityConverter.toDomain(packageEntity.get());
    }

    @Override
    public void deletePackage(long id) {
        packageJpaRepo.deleteById(id);
    }

    @Override
    public void updatePackage(Parcel parcel) {
        packageJpaRepo.save(PackageEntityConverter.toEntity(parcel));
    }

    @Override
    public List<Parcel> getAllEmployeePackages(long employeeId) {
        return packageJpaRepo.findByOwnerId(employeeId).stream()
                .map(PackageEntityConverter::toDomain)
                .toList();
    }

}
