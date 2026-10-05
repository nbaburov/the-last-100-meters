package nl.fontys.s3.backend.controller.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReducedPackageDto {
    private long id;
    private String description;
    private String status;
}
