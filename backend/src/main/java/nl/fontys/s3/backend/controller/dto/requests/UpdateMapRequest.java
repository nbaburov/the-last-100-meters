package nl.fontys.s3.backend.controller.dto.requests;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
public class UpdateMapRequest {

    @NonNull
    private Character[][][] map;
}
