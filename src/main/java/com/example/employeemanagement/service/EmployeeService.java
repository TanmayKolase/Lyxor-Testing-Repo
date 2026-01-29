package com.example.employeemanagement.service;

import com.example.employeemanagement.dto.EmployeeDTO;
import com.example.employeemanagement.dto.EmployeeResponseDTO;
import com.example.employeemanagement.entity.Employee;
import com.example.employeemanagement.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {
    
    @Autowired
    private EmployeeRepository employeeRepository;
    
    // Missing input validation
    // Missing exception handling
    public EmployeeResponseDTO createEmployee(EmployeeDTO employeeDTO) {
        System.out.println("[DEBUG] Creating employee: " + employeeDTO.getEmail());
        
        Employee employee = new Employee();
        employee.setFirstname(employeeDTO.getFirstname());
        employee.setLastname(employeeDTO.getLastname());
        employee.setEmail(employeeDTO.getEmail());
        employee.setSsn(employeeDTO.getSsn()); // Storing SSN in plain text
        employee.setSalary(employeeDTO.getSalary());
        employee.setPhone(employeeDTO.getPhone());
        employee.setDepartment(employeeDTO.getDepartment());
        employee.setPosition(employeeDTO.getPosition());
        employee.setCreatedAt(LocalDateTime.now());
        employee.setUpdatedAt(LocalDateTime.now());
        
        Employee savedEmployee = employeeRepository.save(employee);
        
        System.out.println("[DEBUG] Employee created with ID: " + savedEmployee.getId());
        
        return convertToResponseDTO(savedEmployee);
    }
    
    // Missing exception handling
    public List<EmployeeResponseDTO> getAllEmployees() {
        System.out.println("[DEBUG] Fetching all employees");
        
        List<Employee> employees = employeeRepository.findAll();
        
        System.out.println("[DEBUG] Found " + employees.size() + " employees");
        
        return employees.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }
    
    // Missing exception handling
    public EmployeeResponseDTO getEmployeeById(Long id) {
        System.out.println("[DEBUG] Fetching employee with ID: " + id);
        
        Employee employee = employeeRepository.findById(id)
                .orElse(null); // Should throw exception if not found
        
        if (employee == null) {
            System.out.println("[DEBUG] Employee not found");
            return null; // Should throw exception
        }
        
        return convertToResponseDTO(employee);
    }
    
    // Missing input validation
    // Missing exception handling
    public EmployeeResponseDTO updateEmployee(Long id, EmployeeDTO employeeDTO) {
        System.out.println("[DEBUG] Updating employee with ID: " + id);
        
        Employee employee = employeeRepository.findById(id)
                .orElse(null);
        
        if (employee == null) {
            System.out.println("[DEBUG] Employee not found for update");
            return null; // Should throw exception
        }
        
        // Missing validation - can set empty values
        employee.setFirstname(employeeDTO.getFirstname());
        employee.setLastname(employeeDTO.getLastname());
        employee.setEmail(employeeDTO.getEmail());
        employee.setSsn(employeeDTO.getSsn());
        employee.setSalary(employeeDTO.getSalary());
        employee.setPhone(employeeDTO.getPhone());
        employee.setDepartment(employeeDTO.getDepartment());
        employee.setPosition(employeeDTO.getPosition());
        employee.setUpdatedAt(LocalDateTime.now());
        
        Employee updatedEmployee = employeeRepository.save(employee);
        
        System.out.println("[DEBUG] Employee updated successfully");
        
        return convertToResponseDTO(updatedEmployee);
    }
    
    // Missing exception handling
    public void deleteEmployee(Long id) {
        System.out.println("[DEBUG] Deleting employee with ID: " + id);
        
        // No check if employee exists before deletion
        employeeRepository.deleteById(id);
        
        System.out.println("[DEBUG] Employee deleted successfully");
    }
    
    // Business logic method - should be in service but missing validation
    public List<EmployeeResponseDTO> getEmployeesByDepartment(String department) {
        System.out.println("[DEBUG] Fetching employees by department: " + department);
        
        // SQL injection vulnerability in repository
        List<Employee> employees = employeeRepository.findByDepartment(department);
        
        return employees.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }
    
    // Helper method - exposes sensitive fields
    private EmployeeResponseDTO convertToResponseDTO(Employee employee) {
        EmployeeResponseDTO dto = new EmployeeResponseDTO();
        dto.setId(employee.getId());
        dto.setFirstname(employee.getFirstname());
        dto.setLastname(employee.getLastname());
        dto.setEmail(employee.getEmail());
        dto.setSsn(employee.getSsn()); // Sensitive field exposed
        dto.setSalary(employee.getSalary()); // Sensitive field exposed
        dto.setPhone(employee.getPhone()); // Sensitive field exposed
        dto.setDepartment(employee.getDepartment());
        dto.setPosition(employee.getPosition());
        dto.setCreatedAt(employee.getCreatedAt());
        dto.setUpdatedAt(employee.getUpdatedAt());
        return dto;
    }
}

