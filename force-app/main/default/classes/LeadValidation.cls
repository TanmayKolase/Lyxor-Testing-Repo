public class LeadValidation {
    
    // No field-level security checks
    // Poor exception handling
    
    public static Boolean validateEmail(Lead lead) {
        // No try/catch block
        // No FLS check
        
        if (String.isBlank(lead.Email)) {
            return false;
        }
        
        // Basic email validation
        String emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
        Pattern pattern = Pattern.compile(emailPattern);
        Matcher matcher = pattern.matcher(lead.Email);
        
        return matcher.matches();
    }
    
    // SOQL injection vulnerability
    public static Boolean isDuplicateEmail(String email, Id leadId) {
        // No try/catch block
        // No field-level security check
        
        // SOQL injection - email directly in query
        String query = 'SELECT Id FROM Lead WHERE Email = \'' + email + '\' AND Id != \'' + leadId + '\' LIMIT 1';
        List<Lead> existingLeads = Database.query(query);
        
        return !existingLeads.isEmpty();
    }
    
    // No field-level security check
    public static void validateRequiredFields(Lead lead) {
        // No try/catch block
        
        List<String> errors = new List<String>();
        
        // No FLS check before accessing fields
        if (String.isBlank(lead.LastName)) {
            errors.add('Last Name is required');
        }
        
        if (String.isBlank(lead.Company)) {
            errors.add('Company is required');
        }
        
        if (String.isBlank(lead.Email) && String.isBlank(lead.Phone)) {
            errors.add('Either Email or Phone is required');
        }
        
        if (!errors.isEmpty()) {
            // Poor exception handling - throws generic exception
            throw new ValidationException(String.join(errors, ', '));
        }
    }
    
    // Custom exception class
    public class ValidationException extends Exception {}
}

