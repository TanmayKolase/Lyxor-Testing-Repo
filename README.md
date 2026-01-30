# Payment Processing API

Kotlin Spring Boot application for payment processing with REST APIs.

## Features

- REST APIs for payment processing
- PostgreSQL database integration
- Service layer for business logic
- Payment gateway integration

## Setup

1. Install dependencies:
```bash
./gradlew build
```

2. Set up PostgreSQL database:
```bash
createdb paymentdb
```

3. Update database credentials in `application.yml`

4. Run the application:
```bash
./gradlew bootRun
```

The API will be available at `http://localhost:8080`

## API Endpoints

### POST /api/payments
Create a new payment.

**Request Body:**
```json
{
  "userId": 1,
  "amount": 99.99,
  "currency": "USD",
  "cardNumber": "4111111111111111",
  "cvv": "123",
  "cardHolderName": "John Doe",
  "expiryDate": "12/25",
  "description": "Payment for order #123"
}
```

### GET /api/payments/{id}
Get a payment by ID.

### GET /api/payments
Get all payments (optionally filter by userId).

### GET /api/payments/status/{status}
Get payments by status.

### PUT /api/payments/{id}/refund
Refund a payment.

## Project Structure

```
src/main/kotlin/com/example/payment/
├── entity/
│   └── Payment.kt              # Payment entity
├── dto/
│   ├── PaymentRequest.kt      # Request DTO (missing validation)
│   └── PaymentResponse.kt     # Response DTO
├── controller/
│   └── PaymentController.kt   # REST controller
├── service/
│   ├── PaymentService.kt      # Payment service
│   └── PaymentGatewayService.kt # Gateway service
└── repository/
    └── PaymentRepository.kt    # Repository (SQL injection risk)
```
