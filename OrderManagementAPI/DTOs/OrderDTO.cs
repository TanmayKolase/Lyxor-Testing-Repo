using System.ComponentModel.DataAnnotations; // Unused - validation attributes not used

namespace OrderManagementAPI.DTOs;

// Missing validation attributes
public class CreateOrderDTO
{
    // Missing [Required], [StringLength]
    public string CustomerName { get; set; } = string.Empty;
    
    // Missing [Required], [EmailAddress]
    public string CustomerEmail { get; set; } = string.Empty;
    
    // Sensitive field - should not be in DTO
    // Missing validation
    public string CreditCardNumber { get; set; } = string.Empty;
    
    // Sensitive field
    public string BillingAddress { get; set; } = string.Empty;
    
    public decimal TotalAmount { get; set; }
    
    public string Status { get; set; } = "Pending";
    
    public List<CreateOrderItemDTO> OrderItems { get; set; } = new List<CreateOrderItemDTO>();
}

public class CreateOrderItemDTO
{
    // Missing validation
    public string ProductName { get; set; } = string.Empty;
    
    public int Quantity { get; set; }
    
    public decimal Price { get; set; }
}

public class OrderResponseDTO
{
    public int Id { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerEmail { get; set; } = string.Empty;
    
    // Sensitive data exposed in response
    public string CreditCardNumber { get; set; } = string.Empty;
    public string BillingAddress { get; set; } = string.Empty;
    
    public decimal TotalAmount { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public List<OrderItemResponseDTO> OrderItems { get; set; } = new List<OrderItemResponseDTO>();
}

public class OrderItemResponseDTO
{
    public int Id { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}

