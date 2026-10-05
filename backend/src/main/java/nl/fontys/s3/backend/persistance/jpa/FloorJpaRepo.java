package nl.fontys.s3.backend.persistance.jpa;

import nl.fontys.s3.backend.persistance.entity.FloorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FloorJpaRepo extends JpaRepository<FloorEntity, Long> {
}
