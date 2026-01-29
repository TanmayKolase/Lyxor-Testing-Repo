package com.example.employeemanagement.repository;

import com.example.employeemanagement.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    
    // SQL injection vulnerability - using native query with string concatenation
    // Note: This is intentionally vulnerable - should use @Param annotation
    @Query(value = "SELECT * FROM employees WHERE department = ?1", nativeQuery = true)
    List<Employee> findByDepartment(String department);
    
    // SQL injection vulnerability - native query with string interpolation
    @Query(value = "SELECT * FROM employees WHERE email = ?1", nativeQuery = true)
    Employee findByEmail(String email);
    
    // SQL injection vulnerability - concatenating user input directly
    // This method uses string building which is vulnerable
    default List<Employee> searchByName(String name) {
        // SQL injection vulnerability - building query with string concatenation
        String query = "SELECT * FROM employees WHERE firstname LIKE '%" + name + "%' OR lastname LIKE '%" + name + "%'";
        // In real implementation, this would execute the query
        return null; // Placeholder - actual implementation would be vulnerable
    }
    
    // SQL injection vulnerability - building query dynamically
    default List<Employee> findBySalaryGreaterThan(Double minSalary) {
        // SQL injection vulnerability - direct string concatenation
        String query = "SELECT * FROM employees WHERE salary > " + minSalary;
        // In real implementation, this would execute the query
        return null; // Placeholder - actual implementation would be vulnerable
    }
}

