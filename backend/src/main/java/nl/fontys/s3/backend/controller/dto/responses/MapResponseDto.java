package nl.fontys.s3.backend.controller.dto.responses;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MapResponseDto {
    private Character[][][] map;
}
