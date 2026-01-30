package com.example.payment.repository

import com.example.payment.entity.Payment
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface PaymentRepository : JpaRepository<Payment, Long> {
    
    fun findByUserId(userId: Long): List<Payment>
    
    fun findByStatus(status: String): List<Payment>
    
    // SQL injection risk - using native query with string concatenation
    @Query(value = "SELECT * FROM payments WHERE user_id = :userId AND status = :status", nativeQuery = true)
    fun findByUserIdAndStatus(@Param("userId") userId: Long, @Param("status") status: String): List<Payment>
    
    // SQL injection risk - using native query with string interpolation
    @Query(value = "SELECT * FROM payments WHERE amount > :minAmount AND currency = :currency", nativeQuery = true)
    fun findByAmountGreaterThan(@Param("minAmount") minAmount: Double, @Param("currency") currency: String): List<Payment>
    
    // SQL injection risk - custom query method with potential injection
    @Query(value = "SELECT * FROM payments WHERE description LIKE '%' || :searchTerm || '%'", nativeQuery = true)
    fun searchByDescription(@Param("searchTerm") searchTerm: String): List<Payment>
}

