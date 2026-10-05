package nl.fontys.s3.backend.persistance;

import nl.fontys.s3.backend.domain.Robot;

import java.util.List;

public interface RobotRepository {
    Robot getRobot(long id);
    Robot createRobot(Robot robot);
    List<Robot> getAllIdleRobots();
    void updateRobot(Robot robot);
    void deleteRobot(long id);
    List<Robot> getAllRobots();
}
