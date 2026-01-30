package com.example.payment.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "payments")
class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0
    
    @Column(nullable = false)
    var userId: Long = 0
    
    @Column(nullable = false)
    var amount: Double = 0.0
    
    @Column(nullable = false)
    lateinit var currency: String
    
    @Column(nullable = false)
    lateinit var cardNumber: String  // Sensitive field - should be encrypted
    
    @Column(nullable = false)
    lateinit var cvv: String  // Sensitive field - should be encrypted
    
    @Column(nullable = false)
    lateinit var cardHolderName: String
    
    @Column(nullable = false)
    lateinit var expiryDate: String
    
    @Column(nullable = false)
    lateinit var status: String
    
    @Column(nullable = false)
    lateinit var transactionId: String
    
    var description: String? = null
    
    @Column(nullable = false)
    var createdAt: LocalDateTime = LocalDateTime.now()
    
    @Column(nullable = false)
    var updatedAt: LocalDateTime = LocalDateTime.now()
}

