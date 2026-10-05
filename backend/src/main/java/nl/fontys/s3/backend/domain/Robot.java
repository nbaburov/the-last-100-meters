package nl.fontys.s3.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import nl.fontys.s3.backend.domain.enums.RobotStatus;

@Getter
@Builder
@AllArgsConstructor
public class Robot {

    private long id;
    @Setter
    private RobotStatus status;
}
