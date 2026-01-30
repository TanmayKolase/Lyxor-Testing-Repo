package com.example.payment.service

import org.springframework.stereotype.Service
import java.util.logging.Logger
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import java.net.URI
import java.util.concurrent.CompletableFuture

@Service
class PaymentGatewayService {
    private val logger = Logger.getLogger(PaymentGatewayService::class.java.name)
    private val httpClient = HttpClient.newHttpClient()

    // Hardcoded API keys
    // Sensitive data in logs
    // Blocking calls
    
    companion object {
        // Hardcoded API endpoint - should be in configuration
        private const val PAYMENT_GATEWAY_URL = "https://api.paymentgateway.com/v1/charges"
    }

    fun processPayment(
        amount: Double,
        currency: String,
        cardNumber: String,
        cvv: String,
        cardHolderName: String,
        expiryDate: String,
        apiKey: String,
        secret: String
    ): String {
        logger.info("[DEBUG] Processing payment via gateway")
        logger.info("[DEBUG] Amount: $amount, Card: $cardNumber, CVV: $cvv")  // Sensitive data logged
        logger.info("[DEBUG] API Key: $apiKey, Secret: $secret")  // API keys logged
        
        // Blocking call - should be async
        val requestBody = """
            {
                "amount": $amount,
                "currency": "$currency",
                "card_number": "$cardNumber",
                "cvv": "$cvv",
                "card_holder_name": "$cardHolderName",
                "expiry_date": "$expiryDate"
            }
        """.trimIndent()
        
        val request = HttpRequest.newBuilder()
            .uri(URI.create(PAYMENT_GATEWAY_URL))
            .header("Content-Type", "application/json")
            .header("Authorization", "Bearer $apiKey")
            .POST(HttpRequest.BodyPublishers.ofString(requestBody))
            .build()
        
        // Blocking call in service
        val response = httpClient.send(request, HttpResponse.BodyHandlers.ofString())
        
        logger.info("[DEBUG] Payment gateway response: ${response.body()}")
        
        // No error handling
        // No response validation
        return "txn_${System.currentTimeMillis()}"
    }

    fun processRefund(
        transactionId: String,
        amount: Double,
        apiKey: String,
        secret: String
    ): String {
        logger.info("[DEBUG] Processing refund")
        logger.info("[DEBUG] Transaction ID: $transactionId, Amount: $amount")
        logger.info("[DEBUG] API Key: $apiKey, Secret: $secret")  // API keys logged
        
        // Blocking call - should be async
        val requestBody = """
            {
                "transaction_id": "$transactionId",
                "amount": $amount
            }
        """.trimIndent()
        
        val request = HttpRequest.newBuilder()
            .uri(URI.create("$PAYMENT_GATEWAY_URL/refund"))
            .header("Content-Type", "application/json")
            .header("Authorization", "Bearer $apiKey")
            .POST(HttpRequest.BodyPublishers.ofString(requestBody))
            .build()
        
        // Blocking call
        val response = httpClient.send(request, HttpResponse.BodyHandlers.ofString())
        
        logger.info("[DEBUG] Refund response: ${response.body()}")
        
        // No error handling
        return "refund_${System.currentTimeMillis()}"
    }
}

