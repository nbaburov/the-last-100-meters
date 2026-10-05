package nl.fontys.s3.backend.controller.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class PackageResponseDto {
    private long id;
    private String description;
    private int[] dimensions;
    private int weight;
    private String status;
    private EmployeeResponse owner;
    private RobotResponseDto assignedRobot;
    private String solvedMapPath;

}
