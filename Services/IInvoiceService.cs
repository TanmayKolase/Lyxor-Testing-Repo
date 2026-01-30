using InvoiceManagementAPI.DTOs;

namespace InvoiceManagementAPI.Services;

public interface IInvoiceService
{
    Task<IEnumerable<InvoiceResponse>> GetAllInvoicesAsync();
    Task<InvoiceResponse?> GetInvoiceByIdAsync(int id);
    Task<InvoiceResponse> CreateInvoiceAsync(CreateInvoiceRequest request);
    Task<InvoiceResponse?> UpdateInvoiceAsync(int id, CreateInvoiceRequest request);
    Task<bool> DeleteInvoiceAsync(int id);
    Task<IEnumerable<InvoiceResponse>> GetInvoicesByCustomerIdAsync(int customerId);
}

