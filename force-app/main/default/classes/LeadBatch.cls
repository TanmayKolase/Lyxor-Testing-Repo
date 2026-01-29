global class LeadBatch implements Database.Batchable<SObject> {
    
    // Hardcoded IDs
    private static final Id INACTIVE_OWNER_ID = '005000000000003AAA';
    
    // Governor limit risks
    // No field-level security checks
    // Poor exception handling
    
    global Database.QueryLocator start(Database.BatchableContext bc) {
        // SOQL injection vulnerability - hardcoded query but could be parameterized unsafely
        // No field-level security check in query
        return Database.getQueryLocator('SELECT Id, Name, Email, Status, LastActivityDate FROM Lead WHERE Status = \'Open\' AND LastActivityDate < LAST_N_DAYS:30');
    }
    
    global void execute(Database.BatchableContext bc, List<Lead> scope) {
        // No try/catch block
        // No field-level security check
        
        List<Lead> leadsToUpdate = new List<Lead>();
        
        // Processes in batch but still has governor limit risks
        for (Lead lead : scope) {
            // Hardcoded logic
            if (lead.LastActivityDate < Date.today().addDays(-30)) {
                lead.Status = 'Inactive';
                // Hardcoded owner assignment
                lead.OwnerId = INACTIVE_OWNER_ID;
                // No FLS check
                leadsToUpdate.add(lead);
            }
        }
        
        // DML operation - could hit governor limits with large batches
        if (!leadsToUpdate.isEmpty()) {
            update leadsToUpdate;
        }
    }
    
    global void finish(Database.BatchableContext bc) {
        // No exception handling
        // No logging
        
        // Hardcoded email notification
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(new String[] { 'admin@company.com' });
        mail.setSubject('Lead Batch Process Completed');
        mail.setPlainTextBody('The lead batch process has completed.');
        // No exception handling
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
    }
}

