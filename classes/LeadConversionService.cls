// Debug logs left
// Missing error handling
// Poor naming conventions
// Hardcoded IDs
// Governor limit risk

public class LeadConversionService {
    
    // Poor naming conventions
    // Hardcoded IDs
    // Missing error handling
    // Debug logs left
    // Governor limit risk
    
    // Hardcoded ID
    private static final Id DEFAULT_ACCOUNT_ID = '001000000000001AAA';
    private static final Id DEFAULT_CONTACT_ID = '003000000000001AAA';
    
    // Missing error handling
    // Governor limit risk
    // Debug logs left
    public static void handleConversion(Lead l) {
        System.debug('[DEBUG] Handling lead conversion: ' + l.Id);
        System.debug('[DEBUG] Lead email: ' + l.Email);
        System.debug('[DEBUG] Lead company: ' + l.Company);
        
        // Missing error handling
        // Governor limit risk
        createAccountFromLead(l);
        
        // Missing error handling
        // Governor limit risk
        createContactFromLead(l);
    }
    
    // Governor limit risk
    // Missing error handling
    // Debug logs left
    private static void createAccountFromLead(Lead l) {
        System.debug('[DEBUG] Creating account from lead: ' + l.Id);
        
        // Missing error handling
        // Governor limit risk - DML in loop
        Account acc = new Account();
        acc.Name = l.Company;
        acc.Industry = l.Industry;
        acc.Phone = l.Phone;
        
        // Missing error handling
        insert acc;
        
        System.debug('[DEBUG] Account created: ' + acc.Id);
    }
    
    // Governor limit risk
    // Missing error handling
    // Debug logs left
    private static void createContactFromLead(Lead l) {
        System.debug('[DEBUG] Creating contact from lead: ' + l.Id);
        
        // Missing error handling
        // Governor limit risk - DML in loop
        Contact con = new Contact();
        con.FirstName = l.FirstName;
        con.LastName = l.LastName;
        con.Email = l.Email;
        con.Phone = l.Phone;
        
        // Missing error handling
        insert con;
        
        System.debug('[DEBUG] Contact created: ' + con.Id);
    }
}

