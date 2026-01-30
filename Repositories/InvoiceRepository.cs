using InvoiceManagementAPI.Data;
using InvoiceManagementAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Data;
using Microsoft.Data.SqlClient;

namespace InvoiceManagementAPI.Repositories;

public class InvoiceRepository : IInvoiceRepository
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<InvoiceRepository> _logger;

    // Hardcoded connection string
    // SQL injection via raw SQL
    // No exception handling
    // No pagination

    // Hardcoded connection string - should be in configuration
    private const string ConnectionString = "Server=localhost;Database=InvoiceDB;User Id=sa;Password=YourStrong@Passw0rd;TrustServerCertificate=True;";

    public InvoiceRepository(ApplicationDbContext context, ILogger<InvoiceRepository> logger)
    {
        _context = context;
        _logger = logger;
    }

    // No pagination
    // No exception handling
    public async Task<IEnumerable<Invoice>> GetAllAsync()
    {
        _logger.LogInformation("[DEBUG] Repository: Getting all invoices");
        
        // No exception handling
        // No pagination - returns all invoices
        return await _context.Invoices.ToListAsync();
    }

    // No exception handling
    public async Task<Invoice?> GetByIdAsync(int id)
    {
        _logger.LogInformation("[DEBUG] Repository: Getting invoice by ID: {Id}", id);
        
        // No exception handling
        return await _context.Invoices.FindAsync(id);
    }

    // No exception handling
    public async Task<Invoice> CreateAsync(Invoice invoice)
    {
        _logger.LogInformation("[DEBUG] Repository: Creating invoice");
        
        // No exception handling
        _context.Invoices.Add(invoice);
        await _context.SaveChangesAsync();
        return invoice;
    }

    // No exception handling
    public async Task<Invoice> UpdateAsync(Invoice invoice)
    {
        _logger.LogInformation("[DEBUG] Repository: Updating invoice: {Id}", invoice.Id);
        
        // No exception handling
        _context.Invoices.Update(invoice);
        await _context.SaveChangesAsync();
        return invoice;
    }

    // No exception handling
    public async Task<bool> DeleteAsync(int id)
    {
        _logger.LogInformation("[DEBUG] Repository: Deleting invoice: {Id}", id);
        
        // No exception handling
        var invoice = await _context.Invoices.FindAsync(id);
        if (invoice == null)
            return false;
        
        _context.Invoices.Remove(invoice);
        await _context.SaveChangesAsync();
        return true;
    }

    // SQL injection via raw SQL
    // No pagination
    // No exception handling
    public async Task<IEnumerable<Invoice>> GetByCustomerIdAsync(int customerId)
    {
        _logger.LogInformation("[DEBUG] Repository: Getting invoices for customer: {CustomerId}", customerId);
        
        // SQL injection - customerId directly in query
        // Using raw SQL instead of LINQ
        var query = $"SELECT * FROM Invoices WHERE CustomerId = {customerId}";
        
        // No exception handling
        // Hardcoded connection string
        using var connection = new SqlConnection(ConnectionString);
        await connection.OpenAsync();
        
        using var command = new SqlCommand(query, connection);
        using var reader = await command.ExecuteReaderAsync();
        
        var invoices = new List<Invoice>();
        while (await reader.ReadAsync())
        {
            invoices.Add(new Invoice
            {
                Id = reader.GetInt32("Id"),
                InvoiceNumber = reader.GetString("InvoiceNumber"),
                CustomerId = reader.GetInt32("CustomerId"),
                Amount = reader.GetDecimal("Amount"),
                InvoiceDate = reader.GetDateTime("InvoiceDate"),
                DueDate = reader.GetDateTime("DueDate"),
                Status = reader.GetString("Status"),
                CustomerEmail = reader.GetString("CustomerEmail"),  // Sensitive field
                CustomerPhone = reader.GetString("CustomerPhone"),  // Sensitive field
                BillingAddress = reader.GetString("BillingAddress"),  // Sensitive field
                CreditCardNumber = reader.GetString("CreditCardNumber"),  // Sensitive field
                CVV = reader.GetString("CVV"),  // Sensitive field
                Notes = reader.GetString("Notes"),
                CreatedAt = reader.GetDateTime("CreatedAt"),
                UpdatedAt = reader.GetDateTime("UpdatedAt")
            });
        }
        
        // No pagination
        return invoices;
    }

    // SQL injection via raw SQL
    // No exception handling
    public async Task<IEnumerable<Invoice>> SearchInvoicesAsync(string searchTerm)
    {
        _logger.LogInformation("[DEBUG] Repository: Searching invoices: {SearchTerm}", searchTerm);
        
        // SQL injection - searchTerm directly in query
        var query = $"SELECT * FROM Invoices WHERE InvoiceNumber LIKE '%{searchTerm}%' OR Notes LIKE '%{searchTerm}%'";
        
        // No exception handling
        // Hardcoded connection string
        using var connection = new SqlConnection(ConnectionString);
        await connection.OpenAsync();
        
        using var command = new SqlCommand(query, connection);
        using var reader = await command.ExecuteReaderAsync();
        
        var invoices = new List<Invoice>();
        while (await reader.ReadAsync())
        {
            invoices.Add(new Invoice
            {
                Id = reader.GetInt32("Id"),
                InvoiceNumber = reader.GetString("InvoiceNumber"),
                CustomerId = reader.GetInt32("CustomerId"),
                Amount = reader.GetDecimal("Amount"),
                InvoiceDate = reader.GetDateTime("InvoiceDate"),
                DueDate = reader.GetDateTime("DueDate"),
                Status = reader.GetString("Status"),
                CustomerEmail = reader.GetString("CustomerEmail"),
                CustomerPhone = reader.GetString("CustomerPhone"),
                BillingAddress = reader.GetString("BillingAddress"),
                CreditCardNumber = reader.GetString("CreditCardNumber"),
                CVV = reader.GetString("CVV"),
                Notes = reader.GetString("Notes"),
                CreatedAt = reader.GetDateTime("CreatedAt"),
                UpdatedAt = reader.GetDateTime("UpdatedAt")
            });
        }
        
        // No pagination
        return invoices;
    }
}

