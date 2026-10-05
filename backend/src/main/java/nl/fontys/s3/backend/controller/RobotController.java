package nl.fontys.s3.backend.controller;

import lombok.RequiredArgsConstructor;
import nl.fontys.s3.backend.business.EmployeeService;
import nl.fontys.s3.backend.business.RobotService;
import nl.fontys.s3.backend.controller.converter.RobotConverter;
import nl.fontys.s3.backend.controller.dto.responses.RobotResponseDto;
import nl.fontys.s3.backend.domain.Robot;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/robots")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173/")
public class RobotController {

    private final RobotService robotService;
    private final EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<RobotResponseDto> createRobot() {
        Robot robot = robotService.createRobot();
        RobotResponseDto responseDto = RobotConverter.robotToRobotResponseDto(robot);
        return ResponseEntity.ok().body(responseDto);
    }

    @GetMapping
    public ResponseEntity<List<RobotResponseDto>> getRobots() {
        List<Robot> allRobots = robotService.getAllRobots();
        List<RobotResponseDto> robots = allRobots.stream()
                .map(RobotConverter::robotToRobotResponseDto)
                .toList();
        return ResponseEntity.ok().body(robots);

    }


    @GetMapping("{id}")
    public ResponseEntity<RobotResponseDto> getRobot(@PathVariable long id){
        Robot robot = robotService.getRobot(id);
        RobotResponseDto responseDto = RobotConverter.robotToRobotResponseDto(robot);
        return ResponseEntity.ok().body(responseDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteRobot(@PathVariable long id){
        robotService.deleteRobot(id);
        return ResponseEntity.noContent().build();
    }
}
