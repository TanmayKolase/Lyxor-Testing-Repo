package com.example.import.dto;

// No validation
// No constraints

public class CsvRecordDto {
    private String name;
    private String email;
    private String phone;
    private String address;
    
    // No validation annotations
    // Missing @NotNull, @Email, @Size, etc.
    
    public CsvRecordDto() {
    }
    
    public CsvRecordDto(String name, String email, String phone, String address) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }
}

