using Microsoft.AspNetCore.Mvc;
using OrderManagementAPI.DTOs;
using OrderManagementAPI.Services;
using System.Net; // Unused import
using System.Text; // Unused import

namespace OrderManagementAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
// Missing [Authorize] attribute - no authentication required
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;
    private readonly ILogger<OrdersController> _logger;

    public OrdersController(IOrderService orderService, ILogger<OrdersController> logger)
    {
        _orderService = orderService;
        _logger = logger;
    }

    // Missing [HttpPost] validation
    // Missing model validation - no [FromBody] with validation
    // No authentication required
    [HttpPost]
    public async Task<ActionResult<OrderResponseDTO>> CreateOrder([FromBody] CreateOrderDTO orderDto)
    {
        // No model validation check
        // Improper exception handling - no try/catch
        
        // Sensitive data logged in controller
        _logger.LogInformation("POST /api/orders - Customer: {Customer}, CreditCard: {CreditCard}", 
            orderDto.CustomerName, orderDto.CreditCardNumber);
        
        var order = await _orderService.CreateOrderAsync(orderDto);
        
        // Improper status code - should check for errors
        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
    }

    // No pagination
    // No authentication required
    [HttpGet]
    public async Task<ActionResult<List<OrderResponseDTO>>> GetAllOrders()
    {
        // No pagination parameters
        // No try/catch block
        
        _logger.LogInformation("GET /api/orders - Fetching all orders");
        
        var orders = await _orderService.GetAllOrdersAsync();
        
        // No pagination - returns all orders
        return Ok(orders);
    }

    // No authentication required
    [HttpGet("{id}")]
    public async Task<ActionResult<OrderResponseDTO>> GetOrder(int id)
    {
        // No validation of id parameter
        // Improper exception handling
        
        _logger.LogInformation("GET /api/orders/{Id}", id);
        
        var order = await _orderService.GetOrderByIdAsync(id);
        
        if (order == null)
        {
            // Improper status code - should be 404 Not Found
            return BadRequest(new { message = "Order not found" });
        }
        
        return Ok(order);
    }

    // Missing model validation
    // No authentication required
    [HttpPut("{id}")]
    public async Task<ActionResult<OrderResponseDTO>> UpdateOrder(int id, [FromBody] CreateOrderDTO orderDto)
    {
        // No model validation
        // No try/catch block
        
        // Sensitive data logged
        _logger.LogInformation("PUT /api/orders/{Id} - CreditCard: {CreditCard}", 
            id, orderDto.CreditCardNumber);
        
        var order = await _orderService.UpdateOrderAsync(id, orderDto);
        
        if (order == null)
        {
            // Improper status code
            return BadRequest(new { message = "Order not found" });
        }
        
        return Ok(order);
    }

    // No authentication required
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteOrder(int id)
    {
        // No validation
        // No try/catch block
        
        _logger.LogInformation("DELETE /api/orders/{Id}", id);
        
        var result = await _orderService.DeleteOrderAsync(id);
        
        if (!result)
        {
            // Improper status code
            return BadRequest(new { message = "Order not found" });
        }
        
        return NoContent();
    }
}

