package nl.fontys.s3.backend.business.impl;

import lombok.RequiredArgsConstructor;
import nl.fontys.s3.backend.business.RobotService;
import nl.fontys.s3.backend.domain.Robot;
import nl.fontys.s3.backend.domain.enums.RobotStatus;
import nl.fontys.s3.backend.persistance.RobotRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RobotServiceImpl implements RobotService {

    private final RobotRepository robotRepository;

    @Override
    public List<Robot> getAllRobots() {
        return robotRepository.getAllRobots();
    }

    @Override
    public Robot createRobot() {
        Robot newRobot = new Robot(0, RobotStatus.IDLE);
        return robotRepository.createRobot(newRobot);
    }

    @Override
    public Robot getRobot(long robotId) {
        return robotRepository.getRobot(robotId);
    }

    @Override
    public Robot getIdleRobot() {
        return robotRepository.getAllIdleRobots().get(robotRepository.getAllIdleRobots().size()-1);
    }

    @Override
    public void markRobotAsIdle(long robotId) {
        Robot robot = robotRepository.getRobot(robotId);
        robot.setStatus(RobotStatus.IDLE);
        robotRepository.updateRobot(robot);
    }

    @Override
    public void markRobotInUse(long id){
        Robot robot = robotRepository.getRobot(id);
        robot.setStatus(RobotStatus.LOADED);
        robotRepository.updateRobot(robot);
    }

    @Override
    public void deleteRobot(long robotId) {
        robotRepository.deleteRobot(robotId);
    }
}
