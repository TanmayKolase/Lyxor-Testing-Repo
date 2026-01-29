package com.example.employeemanagement.dto;

// Poor naming convention - should be EmployeeRequest or CreateEmployeeRequest
public class EmployeeDTO {
    
    // Missing validation annotations - no @NotNull, @NotBlank, @Email
    private String firstname; // Poor naming - should be firstName
    
    private String lastname; // Poor naming - should be lastName
    
    // Missing @Email validation
    private String email;
    
    // Sensitive field - should not be in DTO
    private String ssn;
    
    // Sensitive field - should not be in DTO
    private Double salary;
    
    private String phone;
    
    private String department;
    
    private String position;
    
    // Getters and setters
    public String getFirstname() {
        return firstname;
    }
    
    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }
    
    public String getLastname() {
        return lastname;
    }
    
    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getSsn() {
        return ssn;
    }
    
    public void setSsn(String ssn) {
        this.ssn = ssn;
    }
    
    public Double getSalary() {
        return salary;
    }
    
    public void setSalary(Double salary) {
        this.salary = salary;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getDepartment() {
        return department;
    }
    
    public void setDepartment(String department) {
        this.department = department;
    }
    
    public String getPosition() {
        return position;
    }
    
    public void setPosition(String position) {
        this.position = position;
    }
}

