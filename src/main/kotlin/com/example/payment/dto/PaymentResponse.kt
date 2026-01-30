package com.example.payment.dto

data class PaymentResponse(
    val id: Long,
    val userId: Long,
    val amount: Double,
    val currency: String,
    val status: String,
    val transactionId: String,
    val description: String?,
    val createdAt: String
)

