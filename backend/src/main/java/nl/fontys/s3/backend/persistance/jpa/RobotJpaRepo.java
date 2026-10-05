package nl.fontys.s3.backend.persistance.jpa;

import nl.fontys.s3.backend.domain.enums.RobotStatus;
import nl.fontys.s3.backend.persistance.entity.RobotEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RobotJpaRepo extends JpaRepository<RobotEntity, Long> {
    List<RobotEntity> findAllByStatus(RobotStatus status);
}
