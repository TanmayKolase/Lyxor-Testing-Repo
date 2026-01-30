namespace InvoiceManagementAPI.DTOs;

// No input validation
// Missing validation attributes

public class CreateInvoiceRequest
{
    // Missing [Required]
    // Missing [StringLength]
    public string InvoiceNumber { get; set; } = string.Empty;
    
    // Missing [Required]
    // Missing [Range(1, int.MaxValue)]
    public int CustomerId { get; set; }
    
    // Missing [Required]
    // Missing [Range(0.01, double.MaxValue)]
    public decimal Amount { get; set; }
    
    // Missing [Required]
    public DateTime InvoiceDate { get; set; }
    
    // Missing [Required]
    public DateTime DueDate { get; set; }
    
    // Missing [Required]
    // Missing [StringLength]
    public string Status { get; set; } = string.Empty;
    
    // Sensitive fields - should not be in request
    public string CustomerEmail { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public string BillingAddress { get; set; } = string.Empty;
    public string CreditCardNumber { get; set; } = string.Empty;  // Sensitive field
    public string CVV { get; set; } = string.Empty;  // Sensitive field
    
    public string Notes { get; set; } = string.Empty;
}

