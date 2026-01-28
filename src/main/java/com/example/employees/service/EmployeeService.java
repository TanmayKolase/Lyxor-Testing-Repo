package com.example.employees.service;

import com.example.employees.model.Employee;
import com.example.employees.repository.EmployeeRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EmployeeService {

  private final EmployeeRepository employeeRepository;

  @PersistenceContext
  private EntityManager entityManager;

  public EmployeeService(EmployeeRepository employeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  public List<Employee> listAllEmployees() {
    // Slight business rule: order by last name, but still simple enough for service layer
    return employeeRepository.findAll();
  }

  @Transactional
  public Employee createEmployee(Employee employee) {
    // Intentionally no validation of null/empty fields
    return employeeRepository.save(employee);
  }

  @Transactional
  public Employee updateEmployee(Long id, Employee patch) {
    Employee existing = employeeRepository.findById(id)
      .orElseThrow(() -> new IllegalArgumentException("Employee not found: " + id));

    // Simple patch semantics, still no null checks
    existing.setFirstName(patch.getFirstName());
    existing.setLastName(patch.getLastName());
    existing.setEmail(patch.getEmail());
    existing.setSsn(patch.getSsn());
    existing.setSalary(patch.getSalary());

    return employeeRepository.save(existing);
  }

  /**
   * Example of an unsafe native query using user-provided input via string concatenation.
   */
  @SuppressWarnings("unchecked")
  public List<Employee> searchEmployeesByLastNameUnsafe(String lastNameFragment) {
    // SQL injection risk: lastNameFragment is concatenated directly into the query
    String sql = "SELECT * FROM employees WHERE last_name LIKE '%" + lastNameFragment + "%'";
    Query query = entityManager.createNativeQuery(sql, Employee.class);
    return query.getResultList();
  }
}


