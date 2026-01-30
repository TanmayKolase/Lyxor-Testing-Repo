package com.example.payment.controller

import com.example.payment.dto.PaymentRequest
import com.example.payment.dto.PaymentResponse
import com.example.payment.service.PaymentService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.logging.Logger

@RestController
@RequestMapping("/api/payments")
class PaymentController(
    private val paymentService: PaymentService
) {
    private val logger = Logger.getLogger(PaymentController::class.java.name)

    // Improper status codes
    // No exception handler
    // Sensitive data in logs
    
    @PostMapping
    fun createPayment(@RequestBody request: PaymentRequest): ResponseEntity<PaymentResponse> {
        logger.info("[DEBUG] Creating payment for user: ${request.userId}")
        logger.info("[DEBUG] Payment amount: ${request.amount}, Card: ${request.cardNumber}, CVV: ${request.cvv}")  // Sensitive data logged
        
        // No validation - request not validated
        // No exception handling
        
        val payment = paymentService.processPayment(request)
        
        // Improper status code - should be 201 Created
        return ResponseEntity.status(HttpStatus.OK).body(payment)
    }

    @GetMapping("/{id}")
    fun getPayment(@PathVariable id: Long): ResponseEntity<PaymentResponse> {
        logger.info("[DEBUG] Getting payment: $id")
        
        // No exception handling
        val payment = paymentService.getPaymentById(id)
        
        // Improper status code - should return 404 if not found
        return ResponseEntity.status(HttpStatus.OK).body(payment)
    }

    @GetMapping
    fun getAllPayments(
        @RequestParam(required = false) userId: Long?
    ): ResponseEntity<List<PaymentResponse>> {
        logger.info("[DEBUG] Getting all payments, userId: $userId")
        
        // No exception handling
        val payments = if (userId != null) {
            paymentService.getPaymentsByUserId(userId)
        } else {
            paymentService.getAllPayments()
        }
        
        return ResponseEntity.status(HttpStatus.OK).body(payments)
    }

    @GetMapping("/status/{status}")
    fun getPaymentsByStatus(@PathVariable status: String): ResponseEntity<List<PaymentResponse>> {
        logger.info("[DEBUG] Getting payments by status: $status")
        
        // No exception handling
        val payments = paymentService.getPaymentsByStatus(status)
        
        return ResponseEntity.status(HttpStatus.OK).body(payments)
    }

    @PutMapping("/{id}/refund")
    fun refundPayment(@PathVariable id: Long): ResponseEntity<PaymentResponse> {
        logger.info("[DEBUG] Refunding payment: $id")
        
        // No exception handling
        val payment = paymentService.refundPayment(id)
        
        // Improper status code - should be 200 OK or 202 Accepted
        return ResponseEntity.status(HttpStatus.CREATED).body(payment)
    }
}

