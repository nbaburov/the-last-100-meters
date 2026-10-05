package nl.fontys.s3.backend.controller.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeePackagesResponse {
    List<ReducedPackageDto> packages;
}
