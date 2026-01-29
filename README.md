# Employee Management API

Spring Boot REST API for managing employee information.

## Features

- CRUD operations for employees
- JPA/Hibernate integration
- RESTful API endpoints
- DTOs and entity mapping

## Setup

1. Build the project:
```bash
mvn clean install
```

2. Run the application:
```bash
mvn spring-boot:run
```

Or:
```bash
java -jar target/employee-management-1.0.0.jar
```

The API will be available at `http://localhost:8080`

## API Endpoints

### POST /api/employees
Create a new employee.

**Request Body:**
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@company.com",
  "ssn": "123-45-6789",
  "salary": 75000.0,
  "phone": "555-1234",
  "department": "Engineering",
  "position": "Software Engineer"
}
```

### GET /api/employees
Get all employees.

### GET /api/employees/{id}
Get a specific employee by ID.

### PUT /api/employees/{id}
Update an employee.

### DELETE /api/employees/{id}
Delete an employee.

### GET /api/employees/department/{department}
Get employees by department.

## Project Structure

```
src/main/java/com/example/employeemanagement/
├── EmployeeManagementApplication.java  # Main application class
├── controller/
│   └── EmployeeController.java         # REST controllers
├── service/
│   └── EmployeeService.java            # Business logic
├── repository/
│   └── EmployeeRepository.java         # Data access layer
├── entity/
│   └── Employee.java                   # JPA entity
├── dto/
│   ├── EmployeeDTO.java                # Request DTO
│   └── EmployeeResponseDTO.java        # Response DTO
├── config/
│   └── AdminConfig.java                # Configuration
└── exception/
    └── GlobalExceptionHandler.java     # Exception handling
```

## Database

The application uses H2 in-memory database by default. Data will be lost on application restart.

To use PostgreSQL, update `application.properties` with PostgreSQL connection details.
