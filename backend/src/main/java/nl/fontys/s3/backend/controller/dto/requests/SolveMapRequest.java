package nl.fontys.s3.backend.controller.dto.requests;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class SolveMapRequest {
    private int floor;
    private int row;
    private int col;
}
