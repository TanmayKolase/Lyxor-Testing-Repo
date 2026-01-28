package com.example.employees.repository;

import com.example.employees.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

  // In a real app we might have finder methods here
  // List<Employee> findByLastName(String lastName);
}


