package nl.fontys.s3.backend.controller.converter;

import nl.fontys.s3.backend.controller.dto.requests.EmployeeRequest;
import nl.fontys.s3.backend.controller.dto.responses.EmployeePackagesResponse;
import nl.fontys.s3.backend.controller.dto.responses.EmployeeResponse;
import nl.fontys.s3.backend.domain.Employee;

public class EmployeeConverter {
    private EmployeeConverter() {

    }

    public static Employee toDomain(EmployeeRequest requestDTO) {
        return Employee.builder()
                .firstName(requestDTO.getFirstName())
                .lastName(requestDTO.getLastName())
                .email(requestDTO.getEmail())
                .photo(requestDTO.getPhoto())
                .endFloorIndex(requestDTO.getEndFloorIndex())
                .endRow(requestDTO.getEndRow())
                .endCol(requestDTO.getEndCol())
                .build();
    }

    public static EmployeeResponse toResponseDTO(Employee employee) {
        return EmployeeResponse.builder()
                .id(employee.getId())
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName())
                .email(employee.getEmail())
                .photo(employee.getPhoto())
                .endFloorIndex(employee.getEndFloorIndex())
                .endRow(employee.getEndRow())
                .endCol(employee.getEndCol())
                .build();
    }
}
