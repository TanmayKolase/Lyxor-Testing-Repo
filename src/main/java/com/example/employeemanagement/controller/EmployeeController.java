package com.example.employeemanagement.controller;

import com.example.employeemanagement.dto.EmployeeDTO;
import com.example.employeemanagement.dto.EmployeeResponseDTO;
import com.example.employeemanagement.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Missing authentication/authorization - no @PreAuthorize or security configuration
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    
    @Autowired
    private EmployeeService employeeService;
    
    // Business logic in controller - should be in service
    // Missing input validation
    // Missing exception handling
    // No authentication required
    @PostMapping
    public ResponseEntity<EmployeeResponseDTO> createEmployee(@RequestBody EmployeeDTO employeeDTO) {
        System.out.println("[DEBUG] POST /api/employees - Creating employee");
        
        // Business logic in controller - validation should be in service or DTO
        if (employeeDTO.getEmail() == null || employeeDTO.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        // Business logic - checking duplicate email (should be in service)
        // This is business logic that belongs in service layer
        EmployeeResponseDTO createdEmployee = employeeService.createEmployee(employeeDTO);
        
        if (createdEmployee == null) {
            // Missing proper exception handling
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        
        System.out.println("[DEBUG] Employee created: " + createdEmployee.getId());
        
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEmployee);
    }
    
    // No authentication required
    // Missing exception handling
    @GetMapping
    public ResponseEntity<List<EmployeeResponseDTO>> getAllEmployees() {
        System.out.println("[DEBUG] GET /api/employees - Fetching all employees");
        
        List<EmployeeResponseDTO> employees = employeeService.getAllEmployees();
        
        // Business logic in controller - filtering should be in service
        // Filtering employees by some criteria (business logic)
        employees = employees.stream()
                .filter(emp -> emp.getDepartment() != null)
                .collect(java.util.stream.Collectors.toList());
        
        return ResponseEntity.ok(employees);
    }
    
    // No authentication required
    // Missing exception handling
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> getEmployeeById(@PathVariable Long id) {
        System.out.println("[DEBUG] GET /api/employees/" + id);
        
        EmployeeResponseDTO employee = employeeService.getEmployeeById(id);
        
        if (employee == null) {
            // Improper status code - should be 404
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        
        return ResponseEntity.ok(employee);
    }
    
    // No authentication required
    // Missing input validation
    // Missing exception handling
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> updateEmployee(
            @PathVariable Long id,
            @RequestBody EmployeeDTO employeeDTO) {
        System.out.println("[DEBUG] PUT /api/employees/" + id);
        
        // Business logic in controller - validation
        if (employeeDTO.getFirstname() == null || employeeDTO.getFirstname().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        EmployeeResponseDTO updatedEmployee = employeeService.updateEmployee(id, employeeDTO);
        
        if (updatedEmployee == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        
        System.out.println("[DEBUG] Employee updated successfully");
        
        return ResponseEntity.ok(updatedEmployee);
    }
    
    // No authentication required
    // Missing exception handling
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        System.out.println("[DEBUG] DELETE /api/employees/" + id);
        
        // Business logic in controller - checking if exists before delete
        EmployeeResponseDTO employee = employeeService.getEmployeeById(id);
        if (employee == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        
        employeeService.deleteEmployee(id);
        
        System.out.println("[DEBUG] Employee deleted successfully");
        
        return ResponseEntity.noContent().build();
    }
    
    // No authentication required
    // SQL injection vulnerability through service
    @GetMapping("/department/{department}")
    public ResponseEntity<List<EmployeeResponseDTO>> getEmployeesByDepartment(
            @PathVariable String department) {
        System.out.println("[DEBUG] GET /api/employees/department/" + department);
        
        List<EmployeeResponseDTO> employees = employeeService.getEmployeesByDepartment(department);
        
        return ResponseEntity.ok(employees);
    }
}

