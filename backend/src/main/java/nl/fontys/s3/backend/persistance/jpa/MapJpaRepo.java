package nl.fontys.s3.backend.persistance.jpa;

import nl.fontys.s3.backend.persistance.entity.MapEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MapJpaRepo extends JpaRepository<MapEntity, Long> {
}
