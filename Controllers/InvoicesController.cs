using Microsoft.AspNetCore.Mvc;
using InvoiceManagementAPI.Services;
using InvoiceManagementAPI.DTOs;

namespace InvoiceManagementAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvoicesController : ControllerBase
{
    private readonly IInvoiceService _invoiceService;
    private readonly ILogger<InvoicesController> _logger;

    public InvoicesController(IInvoiceService invoiceService, ILogger<InvoicesController> logger)
    {
        _invoiceService = invoiceService;
        _logger = logger;
    }

    // No input validation
    // Improper status codes
    // Sensitive data exposure
    // No pagination
    // No exception middleware
    // Console logs

    [HttpGet]
    public async Task<ActionResult<IEnumerable<InvoiceResponse>>> GetAllInvoices()
    {
        _logger.LogInformation("[DEBUG] Getting all invoices");
        
        // No pagination - returns all invoices
        // No exception handling
        
        var invoices = await _invoiceService.GetAllInvoicesAsync();
        
        // Sensitive data exposure - returns all fields including sensitive data
        // Console logs
        _logger.LogInformation("[DEBUG] Found {Count} invoices", invoices.Count());
        foreach (var invoice in invoices)
        {
            _logger.LogInformation("[DEBUG] Invoice: {InvoiceNumber}, Customer: {Email}, CreditCard: {Card}", 
                invoice.InvoiceNumber, invoice.CustomerEmail, invoice.CreditCardNumber);  // Sensitive data logged
        }
        
        // Improper status code - should be 200 OK
        return Ok(invoices);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<InvoiceResponse>> GetInvoice(int id)
    {
        _logger.LogInformation("[DEBUG] Getting invoice: {Id}", id);
        
        // No exception handling
        var invoice = await _invoiceService.GetInvoiceByIdAsync(id);
        
        if (invoice == null)
        {
            // Improper status code - should be 404 Not Found
            return BadRequest(new { error = "Invoice not found" });
        }
        
        // Sensitive data exposure
        _logger.LogInformation("[DEBUG] Invoice found: {InvoiceNumber}, CreditCard: {Card}", 
            invoice.InvoiceNumber, invoice.CreditCardNumber);  // Sensitive data logged
        
        return Ok(invoice);
    }

    [HttpPost]
    public async Task<ActionResult<InvoiceResponse>> CreateInvoice([FromBody] CreateInvoiceRequest request)
    {
        _logger.LogInformation("[DEBUG] Creating invoice");
        _logger.LogInformation("[DEBUG] Invoice data: {Data}", request);  // Sensitive data logged
        
        // No input validation
        // No ModelState validation
        // Sensitive data in request
        
        // No exception handling
        var invoice = await _invoiceService.CreateInvoiceAsync(request);
        
        // Sensitive data exposure
        _logger.LogInformation("[DEBUG] Invoice created: {Id}, CreditCard: {Card}", 
            invoice.Id, invoice.CreditCardNumber);  // Sensitive data logged
        
        // Improper status code - should be 201 Created
        return Ok(invoice);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<InvoiceResponse>> UpdateInvoice(int id, [FromBody] CreateInvoiceRequest request)
    {
        _logger.LogInformation("[DEBUG] Updating invoice: {Id}", id);
        _logger.LogInformation("[DEBUG] Update data: {Data}", request);  // Sensitive data logged
        
        // No input validation
        // No exception handling
        
        var invoice = await _invoiceService.UpdateInvoiceAsync(id, request);
        
        if (invoice == null)
        {
            // Improper status code
            return BadRequest(new { error = "Invoice not found" });
        }
        
        // Sensitive data exposure
        return Ok(invoice);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteInvoice(int id)
    {
        _logger.LogInformation("[DEBUG] Deleting invoice: {Id}", id);
        
        // No exception handling
        var result = await _invoiceService.DeleteInvoiceAsync(id);
        
        if (!result)
        {
            // Improper status code
            return BadRequest(new { error = "Invoice not found" });
        }
        
        // Improper status code - should be 204 No Content
        return Ok(new { message = "Invoice deleted" });
    }

    [HttpGet("customer/{customerId}")]
    public async Task<ActionResult<IEnumerable<InvoiceResponse>>> GetInvoicesByCustomer(int customerId)
    {
        _logger.LogInformation("[DEBUG] Getting invoices for customer: {CustomerId}", customerId);
        
        // No pagination - returns all invoices for customer
        // No exception handling
        
        var invoices = await _invoiceService.GetInvoicesByCustomerIdAsync(customerId);
        
        // Sensitive data exposure
        return Ok(invoices);
    }
}

