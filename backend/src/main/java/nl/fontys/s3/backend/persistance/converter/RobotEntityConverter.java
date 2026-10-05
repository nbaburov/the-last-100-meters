package nl.fontys.s3.backend.persistance.converter;

import nl.fontys.s3.backend.domain.Robot;
import nl.fontys.s3.backend.persistance.entity.RobotEntity;

public class RobotEntityConverter {

    public static Robot toDomain(RobotEntity robotEntity) {
        return Robot.builder()
                .id(robotEntity.getId())
                .status(robotEntity.getStatus())
                .build();
    }

    public static RobotEntity toEntity(Robot robot) {
        return RobotEntity.builder()
                .id(robot.getId())
                .status(robot.getStatus())
                .build();
    }
}
