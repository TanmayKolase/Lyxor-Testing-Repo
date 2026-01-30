using System.ComponentModel.DataAnnotations;

namespace InvoiceManagementAPI.Models;

// No input validation
// Sensitive fields exposed

public class Invoice
{
    public int Id { get; set; }
    
    // Missing validation attributes
    public string InvoiceNumber { get; set; } = string.Empty;
    // Missing [Required]
    // Missing [StringLength]
    
    public int CustomerId { get; set; }
    // Missing [Required]
    
    public decimal Amount { get; set; }
    // Missing [Range] validation
    // Missing [Required]
    
    public DateTime InvoiceDate { get; set; }
    // Missing [Required]
    
    public DateTime DueDate { get; set; }
    // Missing [Required]
    
    public string Status { get; set; } = string.Empty;
    // Missing [Required]
    // Missing enum constraint
    
    // Sensitive fields - should not be exposed
    public string CustomerEmail { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public string BillingAddress { get; set; } = string.Empty;
    public string CreditCardNumber { get; set; } = string.Empty;  // Sensitive field
    public string CVV { get; set; } = string.Empty;  // Sensitive field
    
    public string Notes { get; set; } = string.Empty;
    
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

