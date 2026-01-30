// No bulkification
// Missing error handling
// Poor naming conventions
// Debug logs left
// Governor limit risk

public class LeadTriggerHandler {
    
    // Poor naming conventions
    // Hardcoded IDs
    // Missing error handling
    // Debug logs left
    
    // Hardcoded IDs - should use Custom Metadata or Custom Settings
    private static final Id HARDCODED_OWNER_ID = '005000000000001AAA';
    private static final Id HARDCODED_QUEUE_ID = '00G000000000001AAA';
    private static final Id HARDCODED_CAMPAIGN_ID = '701000000000001AAA';
    
    // Poor naming convention
    private static boolean alreadyRan = false;
    
    // No bulkification
    // Missing error handling
    public static void handleBeforeInsert(Lead newLead) {
        System.debug('[DEBUG] handleBeforeInsert called for lead: ' + newLead.Id);
        
        // Missing error handling
        // No input validation
        LeadValidationService.validateLead(newLead);
        
        // Hardcoded ID
        if (newLead.OwnerId == null) {
            newLead.OwnerId = HARDCODED_OWNER_ID;
        }
        
        // No input validation
        // Missing error handling
        LeadProcessingService.processLeadData(newLead);
    }
    
    // No bulkification
    // Missing error handling
    public static void handleAfterInsert(Lead newLead) {
        System.debug('[DEBUG] handleAfterInsert called for lead: ' + newLead.Id);
        
        // Missing error handling
        // Governor limit risk - creates related records without checking limits
        LeadRelatedRecordService.createRelatedRecords(newLead);
        
        // Hardcoded ID
        // Missing error handling
        LeadCampaignService.addToCampaign(newLead, HARDCODED_CAMPAIGN_ID);
    }
    
    // No bulkification
    // Missing error handling
    public static void handleBeforeUpdate(Lead newLead, Lead oldLead) {
        System.debug('[DEBUG] handleBeforeUpdate called for lead: ' + newLead.Id);
        
        // Missing error handling
        // No input validation
        if (newLead.Email != oldLead.Email) {
            LeadValidationService.validateEmail(newLead.Email);
        }
        
        // Missing error handling
        LeadProcessingService.processLeadData(newLead);
    }
    
    // No bulkification
    // Missing error handling
    public static void handleAfterUpdate(Lead newLead, Lead oldLead) {
        System.debug('[DEBUG] handleAfterUpdate called for lead: ' + newLead.Id);
        
        // Missing error handling
        // Governor limit risk
        if (newLead.Status != oldLead.Status && newLead.Status == 'Converted') {
            LeadConversionService.handleConversion(newLead);
        }
        
        // Missing error handling
        LeadRelatedRecordService.updateRelatedRecords(newLead);
    }
}

