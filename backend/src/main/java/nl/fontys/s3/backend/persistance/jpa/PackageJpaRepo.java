package nl.fontys.s3.backend.persistance.jpa;

import nl.fontys.s3.backend.persistance.entity.PackageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PackageJpaRepo extends JpaRepository<PackageEntity, Long> {
    List<PackageEntity> findByOwnerId(long ownerId);
}
