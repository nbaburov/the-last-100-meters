package nl.fontys.s3.backend.persistance.impl;

import lombok.RequiredArgsConstructor;
import nl.fontys.s3.backend.domain.Robot;
import nl.fontys.s3.backend.domain.enums.RobotStatus;
import nl.fontys.s3.backend.persistance.RobotRepository;
import nl.fontys.s3.backend.persistance.converter.RobotEntityConverter;
import nl.fontys.s3.backend.persistance.entity.RobotEntity;
import nl.fontys.s3.backend.persistance.jpa.RobotJpaRepo;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class RobotRepositoryImpl implements RobotRepository {

    private final RobotJpaRepo robotJpaRepo;

    @Override
    public Robot getRobot(long id) {
        Optional<RobotEntity> robotEntity = robotJpaRepo.findById(id);
        if (robotEntity.isEmpty()) {
            //TODO: change for custom exception if needed
            throw new IllegalArgumentException("Package with id " + id + " not found");
        }
        return RobotEntityConverter.toDomain(robotEntity.get());
    }

    @Override
    public Robot createRobot(Robot robot) {
        RobotEntity robotEntity = robotJpaRepo.save(RobotEntityConverter.toEntity(robot));
        return RobotEntityConverter.toDomain(robotEntity);
    }

    @Override
    public List<Robot> getAllIdleRobots() {
        return robotJpaRepo.findAllByStatus(RobotStatus.IDLE).stream()
                .map(RobotEntityConverter::toDomain)
                .toList();
    }

    @Override
    public void updateRobot(Robot robot) {
        robotJpaRepo.save(RobotEntityConverter.toEntity(robot));
    }

    @Override
    public void deleteRobot(long id) { robotJpaRepo.deleteById(id); }

    @Override
    public List<Robot> getAllRobots() {
        return robotJpaRepo.findAll().stream()
                .map(RobotEntityConverter::toDomain)
                .toList();


    }

}
