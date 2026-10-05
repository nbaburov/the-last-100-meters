package nl.fontys.s3.backend.business;

import nl.fontys.s3.backend.domain.Robot;

import java.util.List;

public interface RobotService {
    Robot createRobot();
    Robot getRobot(long robotId);
    Robot getIdleRobot();
    void markRobotAsIdle(long id);
    void markRobotInUse(long id);
    void deleteRobot(long robotId);
    List<Robot> getAllRobots();
}
