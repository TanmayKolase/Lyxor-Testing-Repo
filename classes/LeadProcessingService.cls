// SOQL injection
// Governor limit risk
// Hardcoded IDs
// Missing error handling
// Debug logs left
// Poor naming conventions

public class LeadProcessingService {
    
    // Poor naming conventions
    // Hardcoded IDs
    // SOQL injection
    // Governor limit risk
    // Missing error handling
    // Debug logs left
    
    // Hardcoded ID
    private static final Id DEFAULT_RECORD_TYPE_ID = '012000000000001AAA';
    
    // No input validation
    // Missing error handling
    // Debug logs left
    public static void processLeadData(Lead l) {
        System.debug('[DEBUG] Processing lead data: ' + l.Id);
        System.debug('[DEBUG] Lead email: ' + l.Email);
        System.debug('[DEBUG] Lead company: ' + l.Company);
        
        // Missing error handling
        // No input validation
        if (l.RecordTypeId == null) {
            l.RecordTypeId = DEFAULT_RECORD_TYPE_ID;
        }
        
        // Missing error handling
        // Governor limit risk - SOQL in loop potential
        checkForDuplicates(l);
        
        // Missing error handling
        enrichLeadData(l);
    }
    
    // SOQL injection
    // Governor limit risk
    // Missing error handling
    // Debug logs left
    private static void checkForDuplicates(Lead l) {
        System.debug('[DEBUG] Checking for duplicates: ' + l.Email);
        
        // SOQL injection - user input directly in query
        // Missing error handling
        // No input validation
        String query = 'SELECT Id, Email, Company FROM Lead WHERE Email = \'' + l.Email + '\'';
        
        // Governor limit risk - SOQL in loop
        // Missing error handling
        List<Lead> duplicates = Database.query(query);
        
        System.debug('[DEBUG] Found ' + duplicates.size() + ' duplicates');
        
        // Missing error handling
        if (duplicates.size() > 0) {
            System.debug('[DEBUG] Duplicate found: ' + duplicates[0].Id);
        }
    }
    
    // SOQL injection
    // Governor limit risk
    // Missing error handling
    // Debug logs left
    private static void enrichLeadData(Lead l) {
        System.debug('[DEBUG] Enriching lead data: ' + l.Id);
        
        // SOQL injection - user input directly in query
        // Missing error handling
        // No input validation
        if (l.Company != null) {
            String companyQuery = 'SELECT Id, Name, Industry FROM Account WHERE Name = \'' + l.Company + '\' LIMIT 1';
            
            // Governor limit risk
            // Missing error handling
            List<Account> accounts = Database.query(companyQuery);
            
            System.debug('[DEBUG] Found ' + accounts.size() + ' matching accounts');
            
            // Missing error handling
            if (accounts.size() > 0) {
                l.Industry = accounts[0].Industry;
                System.debug('[DEBUG] Updated industry: ' + l.Industry);
            }
        }
    }
}

