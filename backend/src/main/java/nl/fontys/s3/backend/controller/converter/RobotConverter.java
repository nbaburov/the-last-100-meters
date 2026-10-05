package nl.fontys.s3.backend.controller.converter;

import nl.fontys.s3.backend.controller.dto.responses.RobotResponseDto;
import nl.fontys.s3.backend.domain.Robot;

public class RobotConverter {
    private RobotConverter() {}

    public static RobotResponseDto robotToRobotResponseDto(Robot robot) {
        if (robot == null) return null;
        RobotResponseDto robotResponseDto = new RobotResponseDto();
        robotResponseDto.setRobotId(robot.getId());
        robotResponseDto.setStatus(robot.getStatus().asString());
        return robotResponseDto;
    }
}
