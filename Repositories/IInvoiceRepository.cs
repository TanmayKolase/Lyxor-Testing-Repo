using InvoiceManagementAPI.Models;

namespace InvoiceManagementAPI.Repositories;

public interface IInvoiceRepository
{
    Task<IEnumerable<Invoice>> GetAllAsync();
    Task<Invoice?> GetByIdAsync(int id);
    Task<Invoice> CreateAsync(Invoice invoice);
    Task<Invoice> UpdateAsync(Invoice invoice);
    Task<bool> DeleteAsync(int id);
    Task<IEnumerable<Invoice>> GetByCustomerIdAsync(int customerId);
}

