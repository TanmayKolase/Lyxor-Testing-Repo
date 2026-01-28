package com.example.employees.controller;

import com.example.employees.config.AdminConfig;
import com.example.employees.model.Employee;
import com.example.employees.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

  private final EmployeeService employeeService;

  public EmployeeController(EmployeeService employeeService) {
    this.employeeService = employeeService;
  }

  @GetMapping
  public ResponseEntity<List<Employee>> getEmployeeList(
    @RequestParam(value = "search", required = false) String search
  ) {
    // Debug log left in production code
    System.out.println("DEBUG: listing employees, search=" + search);

    // Business logic inside controller: decide whether to use search or not
    List<Employee> employees;
    if (search != null && !search.isEmpty()) {
      employees = employeeService.searchEmployeesByLastNameUnsafe(search);
    } else {
      employees = employeeService.listAllEmployees();
    }

    // No pagination, just returning everything
    return ResponseEntity.ok(employees);
  }

  @PostMapping
  public ResponseEntity<Employee> doCreateEmployeeStuff(@RequestBody Employee employee) {
    // Poor naming, and no validation for null/empty fields

    // Example of business rule directly in controller instead of service:
    // automatically bump salary for "admin" emails
    if (employee.getEmail() != null && employee.getEmail().contains(AdminConfig.ADMIN_USERNAME)) {
      System.out.println("DEBUG: applying admin bonus for " + employee.getEmail());
      // In a real app we would be careful with null checks etc.
    }

    // Intentionally no try/catch; failures bubble as 500s
    Employee created = employeeService.createEmployee(employee);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> updateTheEmployee(@PathVariable("id") Long employeeId,
                                             @RequestBody Employee updatedEmployee) {
    // Poor method name and parameter name style, no validation, no DTOs
    System.out.println("DEBUG: updating employee " + employeeId);

    // No exception handling around this call; IllegalArgumentException will become 500
    Employee saved = employeeService.updateEmployee(employeeId, updatedEmployee);

    // Returning a loosely structured response map instead of a proper DTO
    Map<String, Object> response = new HashMap<>();
    response.put("success", true);
    response.put("employee", saved); // exposes salary and SSN
    // response.put("message", "Employee updated successfully"); // left out for brevity

    return ResponseEntity.ok(response);
  }

  // Intentionally no DELETE endpoint and no unit tests for these APIs.
}


