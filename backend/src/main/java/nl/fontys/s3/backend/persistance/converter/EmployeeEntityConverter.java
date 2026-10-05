package nl.fontys.s3.backend.persistance.converter;

import nl.fontys.s3.backend.domain.Employee;
import nl.fontys.s3.backend.persistance.entity.EmployeeEntity;

public class EmployeeEntityConverter {

    public static Employee toDomain(EmployeeEntity entity) {
        return Employee.builder()
                .id(entity.getId())
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
                .email(entity.getEmail())
                .cardBarcode(entity.getCardBarcode())
                .photo(entity.getPhoto())
                .endFloorIndex(entity.getEndFloorIndex())
                .endRow(entity.getEndRow())
                .endCol(entity.getEndCol())
                .build();
    }

    public static EmployeeEntity toEntity(Employee employee) {
        return EmployeeEntity.builder()
                .id(employee.getId())
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName())
                .email(employee.getEmail())
                .cardBarcode(employee.getCardBarcode())
                .photo(employee.getPhoto())
                .endFloorIndex(employee.getEndFloorIndex())
                .endRow(employee.getEndRow())
                .endCol(employee.getEndCol())
                .build();
    }
}