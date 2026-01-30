// This file exists but is never actually used
// Dead code - exception middleware defined but not applied

using Microsoft.AspNetCore.Http;
using System.Net;
using System.Text.Json;

namespace InvoiceManagementAPI.Middleware;

public class ExceptionMiddleware
{
    // This middleware is defined but never used
    // No exception middleware applied in Program.cs
    
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // This method is defined but never called
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            // Exception handling logic would go here but never used
            _logger.LogError(ex, "An unhandled exception occurred");
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        // This method is defined but never called
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        var response = new { error = "An error occurred while processing your request." };
        return context.Response.WriteAsync(JsonSerializer.Serialize(response));
    }
}

