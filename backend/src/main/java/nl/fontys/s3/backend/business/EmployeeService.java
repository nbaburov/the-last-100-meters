package nl.fontys.s3.backend.business;

import nl.fontys.s3.backend.controller.dto.requests.EmployeeRequest;
import nl.fontys.s3.backend.domain.Employee;

import java.util.List;

public interface EmployeeService {
    Employee createEmployee(EmployeeRequest employee);
    Employee getEmployeeById(Long id);
    List<Employee> getAllEmployees();
    Employee updateEmployee(Long id, EmployeeRequest employee);
    Employee getEmployeeByBarcode(String barcode);
    Employee getEmployeeByEmail(String email);
    void deleteEmployee(Long id);
}
