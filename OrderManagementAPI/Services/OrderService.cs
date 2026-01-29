using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OrderManagementAPI.Data;
using OrderManagementAPI.DTOs;
using OrderManagementAPI.Models;
using System.Data; // Unused import
using System.Data.Common; // Unused import

namespace OrderManagementAPI.Services;

public class OrderService : IOrderService
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<OrderService> _logger;

    public OrderService(ApplicationDbContext context, ILogger<OrderService> logger)
    {
        _context = context;
        _logger = logger;
    }

    // Missing input validation
    // Improper exception handling
    // Sensitive data logged
    public async Task<OrderResponseDTO> CreateOrderAsync(CreateOrderDTO orderDto)
    {
        // Sensitive data logged
        _logger.LogInformation("Creating order for customer: {CustomerName}, Email: {Email}, CreditCard: {CreditCard}", 
            orderDto.CustomerName, orderDto.CustomerEmail, orderDto.CreditCardNumber);
        
        Console.WriteLine($"[DEBUG] Creating order - CreditCard: {orderDto.CreditCardNumber}, Address: {orderDto.BillingAddress}");
        
        // No validation - empty fields allowed
        // No try/catch block
        
        var order = new Order
        {
            CustomerName = orderDto.CustomerName,
            CustomerEmail = orderDto.CustomerEmail,
            CreditCardNumber = orderDto.CreditCardNumber, // Stored in plain text
            BillingAddress = orderDto.BillingAddress, // Sensitive data
            TotalAmount = orderDto.TotalAmount,
            Status = orderDto.Status,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        // Add order items
        foreach (var itemDto in orderDto.OrderItems)
        {
            var orderItem = new OrderItem
            {
                OrderId = order.Id,
                ProductName = itemDto.ProductName,
                Quantity = itemDto.Quantity,
                Price = itemDto.Price
            };
            _context.OrderItems.Add(orderItem);
        }

        await _context.SaveChangesAsync();

        // Sensitive data logged
        _logger.LogInformation("Order created with ID: {OrderId}, CreditCard: {CreditCard}", 
            order.Id, order.CreditCardNumber);

        return MapToResponseDTO(order);
    }

    // No pagination
    // Improper exception handling
    // SQL injection vulnerability
    public async Task<List<OrderResponseDTO>> GetAllOrdersAsync()
    {
        _logger.LogInformation("Fetching all orders");
        
        // No pagination - returns all orders
        // No try/catch block
        
        // SQL injection vulnerability - using raw SQL with string interpolation
        var statusFilter = "Pending"; // This could come from user input
        var query = $"SELECT * FROM Orders WHERE Status = '{statusFilter}'";
        
        // Using raw SQL instead of LINQ
        var orders = await _context.Orders
            .FromSqlRaw($"SELECT * FROM Orders")
            .Include(o => o.OrderItems)
            .ToListAsync();

        // Sensitive data logged
        foreach (var order in orders)
        {
            _logger.LogDebug("Order ID: {OrderId}, CreditCard: {CreditCard}, Address: {Address}", 
                order.Id, order.CreditCardNumber, order.BillingAddress);
        }

        return orders.Select(MapToResponseDTO).ToList();
    }

    // Improper exception handling
    // SQL injection vulnerability
    public async Task<OrderResponseDTO?> GetOrderByIdAsync(int id)
    {
        _logger.LogInformation("Fetching order with ID: {OrderId}", id);
        
        // SQL injection vulnerability - using raw SQL
        // No try/catch block
        var query = $"SELECT * FROM Orders WHERE Id = {id}";
        
        var order = await _context.Orders
            .FromSqlRaw($"SELECT * FROM Orders WHERE Id = {id}")
            .Include(o => o.OrderItems)
            .FirstOrDefaultAsync();

        if (order != null)
        {
            // Sensitive data logged
            _logger.LogInformation("Order found - CreditCard: {CreditCard}, Address: {Address}", 
                order.CreditCardNumber, order.BillingAddress);
        }

        return order != null ? MapToResponseDTO(order) : null;
    }

    // Missing input validation
    // Improper exception handling
    public async Task<OrderResponseDTO?> UpdateOrderAsync(int id, CreateOrderDTO orderDto)
    {
        // Sensitive data logged
        _logger.LogInformation("Updating order {OrderId} - CreditCard: {CreditCard}", 
            id, orderDto.CreditCardNumber);
        
        // No validation
        // No try/catch block
        
        var order = await _context.Orders
            .Include(o => o.OrderItems)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null)
        {
            return null;
        }

        // Update order properties - no validation
        order.CustomerName = orderDto.CustomerName;
        order.CustomerEmail = orderDto.CustomerEmail;
        order.CreditCardNumber = orderDto.CreditCardNumber; // Sensitive data
        order.BillingAddress = orderDto.BillingAddress; // Sensitive data
        order.TotalAmount = orderDto.TotalAmount;
        order.Status = orderDto.Status;
        order.UpdatedAt = DateTime.Now;

        // Update order items - simplified, should handle deletions/additions properly
        _context.OrderItems.RemoveRange(order.OrderItems);
        foreach (var itemDto in orderDto.OrderItems)
        {
            var orderItem = new OrderItem
            {
                OrderId = order.Id,
                ProductName = itemDto.ProductName,
                Quantity = itemDto.Quantity,
                Price = itemDto.Price
            };
            _context.OrderItems.Add(orderItem);
        }

        await _context.SaveChangesAsync();

        // Sensitive data logged
        _logger.LogInformation("Order updated - CreditCard: {CreditCard}", order.CreditCardNumber);

        return MapToResponseDTO(order);
    }

    // Improper exception handling
    public async Task<bool> DeleteOrderAsync(int id)
    {
        _logger.LogInformation("Deleting order {OrderId}", id);
        
        // No try/catch block
        
        var order = await _context.Orders
            .Include(o => o.OrderItems)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null)
        {
            return false;
        }

        // Sensitive data logged before deletion
        _logger.LogInformation("Deleting order - CreditCard: {CreditCard}, Address: {Address}", 
            order.CreditCardNumber, order.BillingAddress);

        _context.OrderItems.RemoveRange(order.OrderItems);
        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();

        return true;
    }

    // Helper method - exposes sensitive data
    private OrderResponseDTO MapToResponseDTO(Order order)
    {
        return new OrderResponseDTO
        {
            Id = order.Id,
            CustomerName = order.CustomerName,
            CustomerEmail = order.CustomerEmail,
            CreditCardNumber = order.CreditCardNumber, // Sensitive data exposed
            BillingAddress = order.BillingAddress, // Sensitive data exposed
            TotalAmount = order.TotalAmount,
            Status = order.Status,
            CreatedAt = order.CreatedAt,
            UpdatedAt = order.UpdatedAt,
            OrderItems = order.OrderItems.Select(item => new OrderItemResponseDTO
            {
                Id = item.Id,
                ProductName = item.ProductName,
                Quantity = item.Quantity,
                Price = item.Price
            }).ToList()
        };
    }
}

