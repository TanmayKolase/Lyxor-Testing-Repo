// Debug logs left
// Missing error handling
// Poor naming conventions
// Dead code

public class LeadUtility {
    
    // Poor naming conventions
    // Missing error handling
    // Debug logs left
    // Dead code - methods not used
    
    // Poor naming convention
    // Missing error handling
    // Debug logs left
    public static void doSomething(Lead l) {
        System.debug('[DEBUG] doSomething called for lead: ' + l.Id);
        
        // Missing error handling
        // No input validation
        if (l != null) {
            System.debug('[DEBUG] Lead is not null');
        }
    }
    
    // Poor naming convention
    // Missing error handling
    // Debug logs left
    public static String getStuff(Lead l) {
        System.debug('[DEBUG] getStuff called for lead: ' + l.Id);
        
        // Missing error handling
        // No input validation
        return l.Company + ' - ' + l.Email;
    }
}

