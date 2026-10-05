package nl.fontys.s3.backend.persistance.impl;

import lombok.RequiredArgsConstructor;
import nl.fontys.s3.backend.domain.Employee;
import nl.fontys.s3.backend.persistance.converter.EmployeeEntityConverter;
import nl.fontys.s3.backend.persistance.EmployeeRepository;
import nl.fontys.s3.backend.persistance.jpa.JPAEmployeeRepository;
import nl.fontys.s3.backend.persistance.entity.EmployeeEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class EmployeeRepositoryImpl implements EmployeeRepository {

        private final JPAEmployeeRepository jpaEmployeeRepository;

        @Override
        public Employee createEmployee(String firstName, String lastName, String email, String photo, int endFloorIndex, int endRow, int endCol) {
                EmployeeEntity newEmployeeEntity = EmployeeEntity.builder()
                        .firstName(firstName)
                        .lastName(lastName)
                        .email(email)
                        .photo(photo)
                        .endFloorIndex(endFloorIndex)
                        .endRow(endRow)
                        .endCol(endCol)
                        .build();

                EmployeeEntity savedEmployeeEntity = jpaEmployeeRepository.save(newEmployeeEntity);
                return EmployeeEntityConverter.toDomain(savedEmployeeEntity);
        }

        @Override
        public Optional<Employee> getEmployeeById(Long id) {
                return jpaEmployeeRepository.findById(id)
                        .map(EmployeeEntityConverter::toDomain);
        }

        @Override
        public Optional<Employee> getEmployeeByBarcode(String barcode) {
                return jpaEmployeeRepository.findByCardBarcode(barcode)
                        .map(EmployeeEntityConverter::toDomain);
        }

        @Override
        public Optional<Employee> getEmployeeByEmail(String email) {
                return jpaEmployeeRepository.findByEmail(email)
                        .map(EmployeeEntityConverter::toDomain);
        }

        @Override
        public List<Employee> getAllEmployees() {
                return jpaEmployeeRepository.findAll().stream()
                        .map(EmployeeEntityConverter::toDomain)
                        .toList();
        }

        @Override
        public Employee updateEmployee(Long id, String firstName, String lastName, String email, String photo, int endFloorIndex, int endRow, int endCol) {
                EmployeeEntity existingEmployee = jpaEmployeeRepository.findById(id)
                        .orElseThrow(() -> new IllegalArgumentException("Employee not found with id: " + id));

                existingEmployee.setFirstName(firstName);
                existingEmployee.setLastName(lastName);
                existingEmployee.setEmail(email);
                existingEmployee.setPhoto(photo);
                existingEmployee.setEndFloorIndex(endFloorIndex);
                existingEmployee.setEndRow(endRow);
                existingEmployee.setEndCol(endCol);

                EmployeeEntity updatedEmployeeEntity = jpaEmployeeRepository.save(existingEmployee);
                return EmployeeEntityConverter.toDomain(updatedEmployeeEntity);
        }

        @Override
        public void deleteEmployee(Long id) {
                jpaEmployeeRepository.deleteById(id);
        }
}
