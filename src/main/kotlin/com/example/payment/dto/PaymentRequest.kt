package com.example.payment.dto

// Missing validation annotations
// No @NotNull, @NotBlank, @Min, @Max, @Email, etc.

data class PaymentRequest(
    val userId: Long,  // Missing @NotNull
    val amount: Double,  // Missing @NotNull, @Min(0.01)
    val currency: String,  // Missing @NotBlank
    val cardNumber: String,  // Missing @NotBlank, @Pattern for card number
    val cvv: String,  // Missing @NotBlank, @Size(min=3, max=4)
    val cardHolderName: String,  // Missing @NotBlank
    val expiryDate: String,  // Missing @NotBlank, @Pattern for date format
    val description: String? = null
)

