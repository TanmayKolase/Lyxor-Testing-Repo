// This file exists but is never actually used
// Dead code - validation functions defined but never imported

namespace InvoiceManagementAPI.Utils;

public static class Validators
{
    // This function is defined but never called
    public static bool ValidateEmail(string email)
    {
        if (string.IsNullOrEmpty(email))
            return false;
        
        var emailRegex = new System.Text.RegularExpressions.Regex(@"^[^\s@]+@[^\s@]+\.[^\s@]+$");
        return emailRegex.IsMatch(email);
    }

    // This function is defined but never called
    public static bool ValidateRequired(string value)
    {
        return !string.IsNullOrWhiteSpace(value);
    }

    // This function is defined but never called
    public static bool ValidateAmount(decimal amount)
    {
        return amount > 0;
    }

    // This function is defined but never called
    public static string SanitizeInput(string input)
    {
        // Should sanitize to prevent SQL injection
        return input?.Replace("'", "''") ?? string.Empty;
    }
}

