public class LeadService {
    
    // Hardcoded IDs
    private static final Id QUALIFIED_STATUS_ID = '00Q000000000001AAA';
    private static final Id DEFAULT_RECORD_TYPE_ID = '012000000000001AAA';
    
    // SOQL injection vulnerability
    // Governor limit risks
    // No field-level security checks
    
    // No bulkification
    // Poor exception handling
    public static void assignLeadsByRegion(List<Lead> leads) {
        // No try/catch block
        // Processes leads individually - not bulkified
        
        for (Lead lead : leads) {
            // SOQL injection vulnerability - region directly in query
            String regionQuery = 'SELECT Id, OwnerId FROM User WHERE Region__c = \'' + lead.Region__c + '\' AND IsActive = true LIMIT 1';
            List<User> users = Database.query(regionQuery);
            
            if (!users.isEmpty()) {
                lead.OwnerId = users[0].OwnerId;
                // No FLS check
            } else {
                // Hardcoded fallback
                lead.OwnerId = '005000000000001AAA';
            }
        }
        
        // DML outside of bulk context - governor limit risk
        update leads;
    }
    
    // SOQL injection vulnerability
    // Governor limit risk - no pagination
    public static List<Lead> findDuplicateLeads(Lead lead) {
        // No try/catch block
        // No field-level security check
        
        // SOQL injection - email and phone directly in query
        String query = 'SELECT Id, Name, Email, Phone FROM Lead WHERE (Email = \'' + lead.Email + '\' OR Phone = \'' + lead.Phone + '\') AND Id != \'' + lead.Id + '\'';
        
        // No LIMIT - governor limit risk
        // Could return too many records
        List<Lead> duplicates = Database.query(query);
        
        return duplicates;
    }
    
    // Hardcoded IDs
    // No bulkification
    // Governor limit risk
    public static void updateLeadScore(List<Lead> leads) {
        // No try/catch block
        
        for (Lead lead : leads) {
            Integer score = 0;
            
            // Hardcoded scoring logic
            if (lead.Industry == 'Technology') {
                score += 10;
            }
            if (lead.NumberOfEmployees > 100) {
                score += 20;
            }
            if (lead.AnnualRevenue > 1000000) {
                score += 30;
            }
            
            // No FLS check
            lead.Lead_Score__c = score;
            
            // Hardcoded threshold
            if (score > 50) {
                lead.Rating = 'Hot';
                // Hardcoded owner assignment
                lead.OwnerId = '005000000000002AAA';
            }
        }
        
        // DML in loop context - governor limit risk
        update leads;
    }
    
    // SOQL injection vulnerability
    // Governor limit risk
    public static void syncLeadsToExternalSystem(List<Lead> leads) {
        // No try/catch block
        // No field-level security check
        
        for (Lead lead : leads) {
            // SOQL injection - lead data in query
            String externalQuery = 'SELECT Id FROM External_Lead__c WHERE Salesforce_Lead_Id__c = \'' + lead.Id + '\'';
            List<External_Lead__c> externalLeads = Database.query(externalQuery);
            
            External_Lead__c externalLead;
            if (externalLeads.isEmpty()) {
                externalLead = new External_Lead__c();
                externalLead.Salesforce_Lead_Id__c = lead.Id;
            } else {
                externalLead = externalLeads[0];
            }
            
            externalLead.Name = lead.Name;
            externalLead.Email__c = lead.Email;
            externalLead.Company__c = lead.Company;
            // No FLS check
            
            // DML in loop - governor limit risk
            upsert externalLead;
        }
    }
}

