namespace OrderManagementAPI.Utils;

// This class is defined but never used - dead code
public static class Helper
{
    // Unused method
    public static string FormatCreditCard(string creditCard)
    {
        if (string.IsNullOrEmpty(creditCard) || creditCard.Length < 4)
        {
            return creditCard;
        }
        
        var lastFour = creditCard.Substring(creditCard.Length - 4);
        return $"****-****-****-{lastFour}";
    }
    
    // Unused method
    public static bool ValidateEmail(string email)
    {
        return email.Contains("@") && email.Contains(".");
    }
}

