package nl.fontys.s3.backend.business.impl;

import lombok.RequiredArgsConstructor;
import nl.fontys.s3.backend.business.EmployeeService;
import nl.fontys.s3.backend.controller.dto.requests.EmployeeRequest;
import nl.fontys.s3.backend.domain.Employee;
import nl.fontys.s3.backend.persistance.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Override
    public Employee createEmployee(EmployeeRequest employeeRequest) {
        return employeeRepository.createEmployee(
                employeeRequest.getFirstName(),
                employeeRequest.getLastName(),
                employeeRequest.getEmail(),
                employeeRequest.getPhoto(),
                employeeRequest.getEndFloorIndex(),
                employeeRequest.getEndRow(),
                employeeRequest.getEndCol()
        );
    }

    @Override
    public Employee getEmployeeById(Long id) {
        return employeeRepository.getEmployeeById(id)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found with id: " + id));
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.getAllEmployees();
    }

    @Override
    public Employee updateEmployee(Long id, EmployeeRequest employeeRequest) {
        return employeeRepository.updateEmployee(
                id,
                employeeRequest.getFirstName(),
                employeeRequest.getLastName(),
                employeeRequest.getEmail(),
                employeeRequest.getPhoto(),
                employeeRequest.getEndFloorIndex(),
                employeeRequest.getEndRow(),
                employeeRequest.getEndCol()
        );
    }

    @Override
    public Employee getEmployeeByBarcode(String barcode) {
        return employeeRepository.getEmployeeByBarcode(barcode)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found with barcode: " + barcode));
    }

    @Override
    public Employee getEmployeeByEmail(String email){
        return employeeRepository.getEmployeeByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found with email: " + email));
    }

    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.deleteEmployee(id);
    }
}
