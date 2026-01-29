public class LeadUtils {
    
    // Hardcoded values
    private static final String DEFAULT_STATUS = 'Open';
    private static final String DEFAULT_RATING = 'Warm';
    
    // No field-level security checks
    // Poor exception handling
    
    // SOQL injection vulnerability
    public static List<Lead> searchLeadsByName(String searchTerm) {
        // No try/catch block
        // No field-level security check
        
        // SOQL injection - search term directly in query
        String query = 'SELECT Id, Name, Email, Company FROM Lead WHERE Name LIKE \'%' + searchTerm + '%\' OR Company LIKE \'%' + searchTerm + '%\'';
        
        // No LIMIT - governor limit risk
        List<Lead> results = Database.query(query);
        
        return results;
    }
    
    // Hardcoded logic
    // No bulkification
    public static void setDefaultValues(List<Lead> leads) {
        // No try/catch block
        // No field-level security check
        
        for (Lead lead : leads) {
            // Hardcoded default values
            if (String.isBlank(lead.Status)) {
                lead.Status = DEFAULT_STATUS;
            }
            if (String.isBlank(lead.Rating)) {
                lead.Rating = DEFAULT_RATING;
            }
            // No FLS check
        }
    }
    
    // SOQL injection vulnerability
    public static Integer getLeadCountBySource(String leadSource) {
        // No try/catch block
        // No field-level security check
        
        // SOQL injection - leadSource directly in query
        String query = 'SELECT COUNT() FROM Lead WHERE LeadSource = \'' + leadSource + '\'';
        Integer count = Database.countQuery(query);
        
        return count;
    }
}

