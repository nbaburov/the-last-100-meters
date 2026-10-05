package nl.fontys.s3.backend.persistance;

import nl.fontys.s3.backend.domain.Employee;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository {
    Employee createEmployee(String firstName, String lastName, String email, String photo, int endFloorIndex, int endRow, int endCol);
    Optional<Employee> getEmployeeById(Long id);
    Optional<Employee> getEmployeeByBarcode(String barcode);
    Optional<Employee> getEmployeeByEmail(String email);
    List<Employee> getAllEmployees();
    Employee updateEmployee(Long id, String firstName, String lastName, String email, String photo, int endFloorIndex, int endRow, int endCol);
    void deleteEmployee(Long id);
}
