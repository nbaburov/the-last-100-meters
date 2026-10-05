package nl.fontys.s3.backend.controller.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class RobotResponseDto {
    private long robotId;
    private String status;
}
