public class LeadHandler {
    
    // Hardcoded IDs - should use Custom Metadata or Custom Settings
    private static final Id DEFAULT_OWNER_ID = '005000000000001AAA';
    private static final Id DEFAULT_QUEUE_ID = '00G000000000001AAA';
    private static final Id DEFAULT_CAMPAIGN_ID = '701000000000001AAA';
    
    // No field-level security checks
    // Poor exception handling
    // SOQL injection vulnerability
    
    public static void handleBeforeInsert(Lead lead) {
        // No field-level security check
        // No try/catch block
        
        // Validation logic
        if (String.isBlank(lead.Email)) {
            lead.addError('Email is required');
        }
        
        // Hardcoded logic
        if (lead.Company == null) {
            lead.Company = 'Unknown';
        }
        
        // Hardcoded ID assignment
        if (lead.OwnerId == null) {
            lead.OwnerId = DEFAULT_OWNER_ID;
        }
        
        // No exception handling
        // Could throw exception if DEFAULT_OWNER_ID is invalid
    }
    
    public static void handleBeforeUpdate(Lead newLead, Lead oldLead) {
        // No field-level security check
        // No try/catch block
        
        // Validation logic
        if (newLead.Email != oldLead.Email && String.isNotBlank(newLead.Email)) {
            // SOQL injection vulnerability - email directly in query
            String emailQuery = 'SELECT Id FROM Lead WHERE Email = \'' + newLead.Email + '\' AND Id != \'' + newLead.Id + '\'';
            List<Lead> existingLeads = Database.query(emailQuery);
            
            if (!existingLeads.isEmpty()) {
                newLead.addError('Email already exists');
            }
        }
        
        // Hardcoded status transition logic
        if (oldLead.Status == 'Open' && newLead.Status == 'Qualified') {
            newLead.Rating = 'Hot';
        }
    }
    
    public static void handleAfterInsert(Lead lead) {
        // No field-level security check
        // No try/catch block
        // Governor limit risk - DML in loop
        
        // Create task for new lead
        Task newTask = new Task();
        newTask.Subject = 'Follow up with ' + lead.Name;
        newTask.WhoId = lead.Id;
        newTask.Status = 'Not Started';
        newTask.Priority = 'Normal';
        // No FLS check before setting fields
        
        // DML in loop - governor limit risk
        insert newTask;
        
        // Hardcoded campaign assignment
        if (lead.LeadSource == 'Web') {
            // SOQL injection vulnerability
            String campaignQuery = 'SELECT Id FROM Campaign WHERE Id = \'' + DEFAULT_CAMPAIGN_ID + '\'';
            List<Campaign> campaigns = Database.query(campaignQuery);
            
            if (!campaigns.isEmpty()) {
                CampaignMember member = new CampaignMember();
                member.LeadId = lead.Id;
                member.CampaignId = DEFAULT_CAMPAIGN_ID;
                // No FLS check
                insert member;
            }
        }
    }
    
    public static void handleAfterUpdate(Lead newLead, Lead oldLead) {
        // No field-level security check
        // No try/catch block
        // Governor limit risk
        
        // Convert lead to account/contact if qualified
        if (oldLead.Status != 'Qualified' && newLead.Status == 'Qualified' && newLead.IsConverted == false) {
            // No exception handling
            convertLead(newLead);
        }
        
        // Update related records
        if (newLead.Company != oldLead.Company) {
            updateRelatedRecords(newLead);
        }
    }
    
    // SOQL injection vulnerability
    // No bulkification
    // Governor limit risk
    private static void convertLead(Lead lead) {
        // No try/catch block
        // No field-level security check
        
        // Hardcoded record type ID
        Id accountRecordTypeId = '012000000000001AAA';
        
        // SOQL injection - company name directly in query
        String companyQuery = 'SELECT Id, Name FROM Account WHERE Name = \'' + lead.Company + '\' LIMIT 1';
        List<Account> existingAccounts = Database.query(companyQuery);
        
        Account account;
        if (existingAccounts.isEmpty()) {
            account = new Account();
            account.Name = lead.Company;
            account.RecordTypeId = accountRecordTypeId;
            // No FLS check
            insert account;
        } else {
            account = existingAccounts[0];
        }
        
        // Create contact
        Contact contact = new Contact();
        contact.FirstName = lead.FirstName;
        contact.LastName = lead.LastName;
        contact.Email = lead.Email;
        contact.AccountId = account.Id;
        // No FLS check
        insert contact;
        
        // Convert lead
        Database.LeadConvert lc = new Database.LeadConvert();
        lc.setLeadId(lead.Id);
        lc.setAccountId(account.Id);
        lc.setContactId(contact.Id);
        lc.setDoNotCreateOpportunity(false);
        lc.setConvertedStatus('Qualified - Converted');
        // No exception handling
        Database.LeadConvertResult lcr = Database.convertLead(lc);
    }
    
    // SOQL injection vulnerability
    // Governor limit risk - no bulkification
    private static void updateRelatedRecords(Lead lead) {
        // No try/catch block
        // No field-level security check
        
        // SOQL injection - company name in query
        String query = 'SELECT Id, Name FROM Account WHERE Name = \'' + lead.Company + '\'';
        List<Account> accounts = Database.query(query);
        
        // DML in loop - governor limit risk
        for (Account acc : accounts) {
            acc.Description = 'Updated from Lead: ' + lead.Name;
            // No FLS check
            update acc;
        }
    }
}

