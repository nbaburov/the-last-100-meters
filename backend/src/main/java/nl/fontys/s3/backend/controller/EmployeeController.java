package nl.fontys.s3.backend.controller;

import nl.fontys.s3.backend.business.EmployeeService;
import nl.fontys.s3.backend.business.PackageService;
import nl.fontys.s3.backend.controller.converter.EmployeeConverter;
import nl.fontys.s3.backend.controller.converter.PackageConverter;
import nl.fontys.s3.backend.controller.dto.requests.EmployeeRequest;
import nl.fontys.s3.backend.controller.dto.responses.EmployeePackagesResponse;
import nl.fontys.s3.backend.controller.dto.responses.EmployeeResponse;
import nl.fontys.s3.backend.controller.dto.responses.ReducedPackageDto;
import nl.fontys.s3.backend.domain.Employee;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "http://localhost:5173/")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final PackageService packageService;

    public EmployeeController(EmployeeService employeeService, PackageService packageService) {
        this.employeeService = employeeService;
        this.packageService = packageService;
    }

    @PostMapping
    public ResponseEntity<EmployeeResponse> createEmployee(@RequestBody EmployeeRequest requestDTO) {
        Employee employee = employeeService.createEmployee(requestDTO);
        EmployeeResponse response = EmployeeConverter.toResponseDTO(employee);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponse> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeService.getEmployeeById(id);
        EmployeeResponse response = EmployeeConverter.toResponseDTO(employee);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/barcode/{barcodeId}")
    public ResponseEntity<EmployeeResponse> getEmployeeByBarcode(@PathVariable String barcodeId) {
        Employee employee = employeeService.getEmployeeByBarcode(barcodeId);
        EmployeeResponse response = EmployeeConverter.toResponseDTO(employee);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<EmployeeResponse>> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        List<EmployeeResponse> responses = employees.stream()
                .map(EmployeeConverter::toResponseDTO)
                .toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}/packages")
    public ResponseEntity<EmployeePackagesResponse> getEmployeePackages(@PathVariable Long id) {
        List<ReducedPackageDto> packages = packageService.getEmployeePackages(id).stream()
                .map(PackageConverter::parcelToReducedPackageDto)
                .toList();
        EmployeePackagesResponse response = new EmployeePackagesResponse(packages);
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponse> updateEmployee(@PathVariable Long id,
            @RequestBody EmployeeRequest requestDTO) {
        Employee updatedEmployee = employeeService.updateEmployee(id, requestDTO);
        EmployeeResponse response = EmployeeConverter.toResponseDTO(updatedEmployee);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
}
