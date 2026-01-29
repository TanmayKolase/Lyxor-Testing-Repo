using OrderManagementAPI.DTOs;

namespace OrderManagementAPI.Services;

public interface IOrderService
{
    Task<OrderResponseDTO> CreateOrderAsync(CreateOrderDTO orderDto);
    Task<List<OrderResponseDTO>> GetAllOrdersAsync();
    Task<OrderResponseDTO?> GetOrderByIdAsync(int id);
    Task<OrderResponseDTO?> UpdateOrderAsync(int id, CreateOrderDTO orderDto);
    Task<bool> DeleteOrderAsync(int id);
}

