// No input validation
// Missing error handling
// Poor naming conventions
// Debug logs left

public class LeadValidationService {
    
    // Poor naming conventions
    // No input validation
    // Missing error handling
    // Debug logs left
    
    // Poor naming - should be validateLeadFields or similar
    public static void validateLead(Lead l) {
        System.debug('[DEBUG] Validating lead: ' + l.Id);
        
        // No input validation - doesn't check for null or empty
        // Missing error handling
        if (l.LastName == null || l.LastName == '') {
            l.addError('Last Name is required');
        }
        
        // No email format validation
        // Missing error handling
        if (l.Email != null && l.Email != '') {
            // No actual email validation - just checks if not empty
            System.debug('[DEBUG] Email provided: ' + l.Email);
        }
        
        // No phone format validation
        // Missing error handling
        if (l.Phone != null) {
            System.debug('[DEBUG] Phone provided: ' + l.Phone);
        }
        
        // No validation for required fields
        // Missing error handling
        validateCompany(l);
    }
    
    // Poor naming convention
    // No input validation
    // Missing error handling
    public static void validateEmail(String email) {
        System.debug('[DEBUG] Validating email: ' + email);
        
        // No input validation - doesn't check for null
        // No email format validation
        // Missing error handling
        if (email != null && email.contains('@')) {
            System.debug('[DEBUG] Email appears valid');
        } else {
            System.debug('[DEBUG] Email validation failed');
        }
    }
    
    // Poor naming convention
    // No input validation
    // Missing error handling
    private static void validateCompany(Lead l) {
        System.debug('[DEBUG] Validating company for lead: ' + l.Id);
        
        // No input validation - doesn't check for null or empty
        // Missing error handling
        if (l.Company == null || l.Company == '') {
            l.addError('Company is required');
        }
    }
}

