package com.example.payment.service

import com.example.payment.dto.PaymentRequest
import com.example.payment.dto.PaymentResponse
import com.example.payment.entity.Payment
import com.example.payment.repository.PaymentRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.logging.Logger
import java.util.concurrent.CompletableFuture
import java.util.concurrent.Executors

@Service
class PaymentService(
    private val paymentRepository: PaymentRepository,
    private val paymentGatewayService: PaymentGatewayService
) {
    private val logger = Logger.getLogger(PaymentService::class.java.name)
    private val executor = Executors.newFixedThreadPool(10)

    // Hardcoded API keys
    // Sensitive data in logs
    // Blocking calls in async flow
    // No exception handling
    
    companion object {
        // Hardcoded API keys - should be in environment variables
        private const val PAYMENT_GATEWAY_API_KEY = "sk_live_1234567890abcdef"
        private const val PAYMENT_GATEWAY_SECRET = "secret_key_12345"
        private const val STRIPE_API_KEY = "sk_live_9876543210fedcba"
    }

    @Transactional
    fun processPayment(request: PaymentRequest): PaymentResponse {
        logger.info("[DEBUG] Processing payment for user: ${request.userId}")
        logger.info("[DEBUG] Card number: ${request.cardNumber}, CVV: ${request.cvv}")  // Sensitive data logged
        logger.info("[DEBUG] Using API key: $PAYMENT_GATEWAY_API_KEY")  // API key logged
        
        // No validation
        // No exception handling
        
        // Blocking call in async flow
        val transactionId = paymentGatewayService.processPayment(
            amount = request.amount,
            currency = request.currency,
            cardNumber = request.cardNumber,
            cvv = request.cvv,
            cardHolderName = request.cardHolderName,
            expiryDate = request.expiryDate,
            apiKey = PAYMENT_GATEWAY_API_KEY,
            secret = PAYMENT_GATEWAY_SECRET
        )
        
        val payment = Payment(
            userId = request.userId,
            amount = request.amount,
            currency = request.currency,
            cardNumber = request.cardNumber,  // Stored in plain text
            cvv = request.cvv,  // Stored in plain text
            cardHolderName = request.cardHolderName,
            expiryDate = request.expiryDate,
            status = "completed",
            transactionId = transactionId,
            description = request.description
        )
        
        val savedPayment = paymentRepository.save(payment)
        logger.info("[DEBUG] Payment saved with ID: ${savedPayment.id}")
        
        return mapToResponse(savedPayment)
    }

    fun getPaymentById(id: Long): PaymentResponse {
        logger.info("[DEBUG] Getting payment by ID: $id")
        
        // No exception handling
        val payment = paymentRepository.findById(id)
            .orElseThrow { RuntimeException("Payment not found") }  // Generic exception
        
        logger.info("[DEBUG] Payment found: ${payment.id}, Card: ${payment.cardNumber}")  // Sensitive data logged
        
        return mapToResponse(payment)
    }

    fun getAllPayments(): List<PaymentResponse> {
        logger.info("[DEBUG] Getting all payments")
        
        // No exception handling
        val payments = paymentRepository.findAll()
        
        // Sensitive data logged
        payments.forEach { payment ->
            logger.info("[DEBUG] Payment: ${payment.id}, Card: ${payment.cardNumber}, CVV: ${payment.cvv}")
        }
        
        return payments.map { mapToResponse(it) }
    }

    fun getPaymentsByUserId(userId: Long): List<PaymentResponse> {
        logger.info("[DEBUG] Getting payments for user: $userId")
        
        // No exception handling
        val payments = paymentRepository.findByUserId(userId)
        
        return payments.map { mapToResponse(it) }
    }

    fun getPaymentsByStatus(status: String): List<PaymentResponse> {
        logger.info("[DEBUG] Getting payments by status: $status")
        
        // No exception handling
        val payments = paymentRepository.findByStatus(status)
        
        return payments.map { mapToResponse(it) }
    }

    @Transactional
    fun refundPayment(id: Long): PaymentResponse {
        logger.info("[DEBUG] Refunding payment: $id")
        
        // No exception handling
        val payment = paymentRepository.findById(id)
            .orElseThrow { RuntimeException("Payment not found") }
        
        logger.info("[DEBUG] Refunding payment: ${payment.id}, Card: ${payment.cardNumber}")  // Sensitive data logged
        
        // Blocking call in async flow
        val refundId = paymentGatewayService.processRefund(
            transactionId = payment.transactionId,
            amount = payment.amount,
            apiKey = PAYMENT_GATEWAY_API_KEY,
            secret = PAYMENT_GATEWAY_SECRET
        )
        
        payment.status = "refunded"
        val updatedPayment = paymentRepository.save(payment)
        
        return mapToResponse(updatedPayment)
    }

    private fun mapToResponse(payment: Payment): PaymentResponse {
        return PaymentResponse(
            id = payment.id,
            userId = payment.userId,
            amount = payment.amount,
            currency = payment.currency,
            status = payment.status,
            transactionId = payment.transactionId,
            description = payment.description,
            createdAt = payment.createdAt.toString()
        )
    }
}

