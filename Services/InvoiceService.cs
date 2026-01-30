using InvoiceManagementAPI.DTOs;
using InvoiceManagementAPI.Models;
using InvoiceManagementAPI.Repositories;
using Microsoft.EntityFrameworkCore;

namespace InvoiceManagementAPI.Services;

public class InvoiceService : IInvoiceService
{
    private readonly IInvoiceRepository _repository;
    private readonly ILogger<InvoiceService> _logger;

    public InvoiceService(IInvoiceRepository repository, ILogger<InvoiceService> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    // No exception handling
    // Sensitive data exposure
    // No pagination
    // Console logs

    public async Task<IEnumerable<InvoiceResponse>> GetAllInvoicesAsync()
    {
        _logger.LogInformation("[DEBUG] Service: Getting all invoices");
        
        // No exception handling
        // No pagination
        var invoices = await _repository.GetAllAsync();
        
        // Sensitive data exposure - maps all fields including sensitive data
        return invoices.Select(i => new InvoiceResponse
        {
            Id = i.Id,
            InvoiceNumber = i.InvoiceNumber,
            CustomerId = i.CustomerId,
            Amount = i.Amount,
            InvoiceDate = i.InvoiceDate,
            DueDate = i.DueDate,
            Status = i.Status,
            CustomerEmail = i.CustomerEmail,  // Sensitive field
            CustomerPhone = i.CustomerPhone,  // Sensitive field
            BillingAddress = i.BillingAddress,  // Sensitive field
            CreditCardNumber = i.CreditCardNumber,  // Sensitive field
            CVV = i.CVV,  // Sensitive field
            Notes = i.Notes,
            CreatedAt = i.CreatedAt,
            UpdatedAt = i.UpdatedAt
        });
    }

    public async Task<InvoiceResponse?> GetInvoiceByIdAsync(int id)
    {
        _logger.LogInformation("[DEBUG] Service: Getting invoice by ID: {Id}", id);
        
        // No exception handling
        var invoice = await _repository.GetByIdAsync(id);
        
        if (invoice == null)
            return null;
        
        // Sensitive data exposure
        return new InvoiceResponse
        {
            Id = invoice.Id,
            InvoiceNumber = invoice.InvoiceNumber,
            CustomerId = invoice.CustomerId,
            Amount = invoice.Amount,
            InvoiceDate = invoice.InvoiceDate,
            DueDate = invoice.DueDate,
            Status = invoice.Status,
            CustomerEmail = invoice.CustomerEmail,  // Sensitive field
            CustomerPhone = invoice.CustomerPhone,  // Sensitive field
            BillingAddress = invoice.BillingAddress,  // Sensitive field
            CreditCardNumber = invoice.CreditCardNumber,  // Sensitive field
            CVV = invoice.CVV,  // Sensitive field
            Notes = invoice.Notes,
            CreatedAt = invoice.CreatedAt,
            UpdatedAt = invoice.UpdatedAt
        };
    }

    public async Task<InvoiceResponse> CreateInvoiceAsync(CreateInvoiceRequest request)
    {
        _logger.LogInformation("[DEBUG] Service: Creating invoice");
        _logger.LogInformation("[DEBUG] Request data: {Data}", request);  // Sensitive data logged
        
        // No input validation
        // No exception handling
        
        var invoice = new Invoice
        {
            InvoiceNumber = request.InvoiceNumber,
            CustomerId = request.CustomerId,
            Amount = request.Amount,
            InvoiceDate = request.InvoiceDate,
            DueDate = request.DueDate,
            Status = request.Status,
            CustomerEmail = request.CustomerEmail,  // Sensitive field stored
            CustomerPhone = request.CustomerPhone,  // Sensitive field stored
            BillingAddress = request.BillingAddress,  // Sensitive field stored
            CreditCardNumber = request.CreditCardNumber,  // Sensitive field stored in plain text
            CVV = request.CVV,  // Sensitive field stored in plain text
            Notes = request.Notes,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        
        // No exception handling
        var createdInvoice = await _repository.CreateAsync(invoice);
        
        // Sensitive data exposure
        return new InvoiceResponse
        {
            Id = createdInvoice.Id,
            InvoiceNumber = createdInvoice.InvoiceNumber,
            CustomerId = createdInvoice.CustomerId,
            Amount = createdInvoice.Amount,
            InvoiceDate = createdInvoice.InvoiceDate,
            DueDate = createdInvoice.DueDate,
            Status = createdInvoice.Status,
            CustomerEmail = createdInvoice.CustomerEmail,  // Sensitive field
            CustomerPhone = createdInvoice.CustomerPhone,  // Sensitive field
            BillingAddress = createdInvoice.BillingAddress,  // Sensitive field
            CreditCardNumber = createdInvoice.CreditCardNumber,  // Sensitive field
            CVV = createdInvoice.CVV,  // Sensitive field
            Notes = createdInvoice.Notes,
            CreatedAt = createdInvoice.CreatedAt,
            UpdatedAt = createdInvoice.UpdatedAt
        };
    }

    public async Task<InvoiceResponse?> UpdateInvoiceAsync(int id, CreateInvoiceRequest request)
    {
        _logger.LogInformation("[DEBUG] Service: Updating invoice: {Id}", id);
        
        // No exception handling
        var invoice = await _repository.GetByIdAsync(id);
        
        if (invoice == null)
            return null;
        
        // No validation
        invoice.InvoiceNumber = request.InvoiceNumber;
        invoice.CustomerId = request.CustomerId;
        invoice.Amount = request.Amount;
        invoice.InvoiceDate = request.InvoiceDate;
        invoice.DueDate = request.DueDate;
        invoice.Status = request.Status;
        invoice.CustomerEmail = request.CustomerEmail;  // Sensitive field
        invoice.CustomerPhone = request.CustomerPhone;  // Sensitive field
        invoice.BillingAddress = request.BillingAddress;  // Sensitive field
        invoice.CreditCardNumber = request.CreditCardNumber;  // Sensitive field
        invoice.CVV = request.CVV;  // Sensitive field
        invoice.Notes = request.Notes;
        invoice.UpdatedAt = DateTime.UtcNow;
        
        // No exception handling
        var updatedInvoice = await _repository.UpdateAsync(invoice);
        
        // Sensitive data exposure
        return new InvoiceResponse
        {
            Id = updatedInvoice.Id,
            InvoiceNumber = updatedInvoice.InvoiceNumber,
            CustomerId = updatedInvoice.CustomerId,
            Amount = updatedInvoice.Amount,
            InvoiceDate = updatedInvoice.InvoiceDate,
            DueDate = updatedInvoice.DueDate,
            Status = updatedInvoice.Status,
            CustomerEmail = updatedInvoice.CustomerEmail,  // Sensitive field
            CustomerPhone = updatedInvoice.CustomerPhone,  // Sensitive field
            BillingAddress = updatedInvoice.BillingAddress,  // Sensitive field
            CreditCardNumber = updatedInvoice.CreditCardNumber,  // Sensitive field
            CVV = updatedInvoice.CVV,  // Sensitive field
            Notes = updatedInvoice.Notes,
            CreatedAt = updatedInvoice.CreatedAt,
            UpdatedAt = updatedInvoice.UpdatedAt
        };
    }

    public async Task<bool> DeleteInvoiceAsync(int id)
    {
        _logger.LogInformation("[DEBUG] Service: Deleting invoice: {Id}", id);
        
        // No exception handling
        return await _repository.DeleteAsync(id);
    }

    public async Task<IEnumerable<InvoiceResponse>> GetInvoicesByCustomerIdAsync(int customerId)
    {
        _logger.LogInformation("[DEBUG] Service: Getting invoices for customer: {CustomerId}", customerId);
        
        // No pagination
        // No exception handling
        var invoices = await _repository.GetByCustomerIdAsync(customerId);
        
        // Sensitive data exposure
        return invoices.Select(i => new InvoiceResponse
        {
            Id = i.Id,
            InvoiceNumber = i.InvoiceNumber,
            CustomerId = i.CustomerId,
            Amount = i.Amount,
            InvoiceDate = i.InvoiceDate,
            DueDate = i.DueDate,
            Status = i.Status,
            CustomerEmail = i.CustomerEmail,  // Sensitive field
            CustomerPhone = i.CustomerPhone,  // Sensitive field
            BillingAddress = i.BillingAddress,  // Sensitive field
            CreditCardNumber = i.CreditCardNumber,  // Sensitive field
            CVV = i.CVV,  // Sensitive field
            Notes = i.Notes,
            CreatedAt = i.CreatedAt,
            UpdatedAt = i.UpdatedAt
        });
    }
}

