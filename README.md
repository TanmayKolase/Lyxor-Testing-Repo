# Bulk Data Import Job

Spring Boot application with Spring Batch for bulk CSV data import into database.

## Features

- Import CSV data into database
- Batch processing using Spring Batch
- Job configuration and step setup
- REST endpoint to trigger job

## Setup

1. Install dependencies:
```bash
mvn clean install
```

2. Set up PostgreSQL database:
```bash
createdb import_db
```

3. Update database configuration in `application.properties`

4. Place CSV file at hardcoded path: `/tmp/import/data.csv`

5. Run the application:
```bash
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`

## Project Structure

```
src/main/java/com/example/import/
├── config/
│   └── BatchConfig.java        # Batch configuration (missing transaction, no rollback, chunk size misconfiguration)
├── entity/
│   └── ImportRecord.java       # Entity class (no validation)
├── dto/
│   └── CsvRecordDto.java       # DTO class (no validation)
├── reader/
│   └── CsvItemReader.java      # CSV reader (hardcoded paths, exceptions not propagated, no validation)
├── processor/
│   └── ImportRecordProcessor.java # Processor (no validation, exceptions not propagated)
├── writer/
│   └── ImportRecordWriter.java # Writer (missing transaction, partial failures, exceptions not propagated)
├── repository/
│   └── ImportRecordRepository.java # Repository
├── service/
│   └── ImportService.java      # Service (hardcoded paths, no job status tracking, poor logging)
├── controller/
│   └── ImportController.java   # Controller (partial failures not handled, no job status tracking)
└── ImportApplication.java      # Main application
```

## API Endpoints

### POST /api/import/start
Start the import job.

### GET /api/import/status/{batchId}
Get job status (not implemented).

### GET /api/import/validate
Validate input file.

## Known Issues

- Missing transaction management
- Partial failures not handled correctly
- No rollback on failed batch step
- Hardcoded file paths
- No validation for input records
- Poor and inconsistent logging
- Performance risk due to chunk size misconfiguration
- Exceptions caught but not propagated
- No job status tracking
