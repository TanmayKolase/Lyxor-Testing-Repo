using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrderManagementAPI.Models;

public class Order
{
    [Key]
    public int Id { get; set; }
    
    // Missing validation - no [Required], no [StringLength]
    public string CustomerName { get; set; } = string.Empty;
    
    // Missing validation - no [Required], no [EmailAddress]
    public string CustomerEmail { get; set; } = string.Empty;
    
    // Sensitive field - credit card info
    // Missing validation
    public string CreditCardNumber { get; set; } = string.Empty;
    
    // Sensitive field - should be encrypted
    public string BillingAddress { get; set; } = string.Empty;
    
    public decimal TotalAmount { get; set; }
    
    // Missing validation - no [Required]
    public string Status { get; set; } = string.Empty;
    
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
    
    // Navigation property
    public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}

public class OrderItem
{
    [Key]
    public int Id { get; set; }
    
    public int OrderId { get; set; }
    
    // Missing validation
    public string ProductName { get; set; } = string.Empty;
    
    public int Quantity { get; set; }
    
    public decimal Price { get; set; }
    
    [ForeignKey("OrderId")]
    public Order? Order { get; set; }
}

