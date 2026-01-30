namespace InvoiceManagementAPI.DTOs;

// Sensitive data exposure
public class InvoiceResponse
{
    public int Id { get; set; }
    public string InvoiceNumber { get; set; } = string.Empty;
    public int CustomerId { get; set; }
    public decimal Amount { get; set; }
    public DateTime InvoiceDate { get; set; }
    public DateTime DueDate { get; set; }
    public string Status { get; set; } = string.Empty;
    
    // Sensitive fields exposed - should not be in response
    public string CustomerEmail { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public string BillingAddress { get; set; } = string.Empty;
    public string CreditCardNumber { get; set; } = string.Empty;  // Sensitive field
    public string CVV { get; set; } = string.Empty;  // Sensitive field
    
    public string Notes { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

