// No bulkification
// Missing error handling
// Poor naming conventions
// Debug logs left

trigger LeadTrigger on Lead (before insert, after insert, before update, after update) {
    
    // No bulkification - processes records one at a time
    // Missing error handling
    // Debug logs left
    
    System.debug('=== LeadTrigger START ===');
    System.debug('Trigger context: ' + Trigger.operationType);
    System.debug('Number of records: ' + Trigger.new.size());
    
    // No bulkification - iterates through records individually
    if (Trigger.isBefore && Trigger.isInsert) {
        for (Lead l : Trigger.new) {
            System.debug('[DEBUG] Processing lead: ' + l.Id + ', Email: ' + l.Email);
            // Missing error handling
            LeadTriggerHandler.handleBeforeInsert(l);
        }
    }
    
    if (Trigger.isAfter && Trigger.isInsert) {
        for (Lead l : Trigger.new) {
            System.debug('[DEBUG] Processing lead after insert: ' + l.Id);
            // Missing error handling
            LeadTriggerHandler.handleAfterInsert(l);
        }
    }
    
    if (Trigger.isBefore && Trigger.isUpdate) {
        for (Lead l : Trigger.new) {
            System.debug('[DEBUG] Processing lead update: ' + l.Id);
            // Missing error handling
            LeadTriggerHandler.handleBeforeUpdate(l, Trigger.oldMap.get(l.Id));
        }
    }
    
    if (Trigger.isAfter && Trigger.isUpdate) {
        for (Lead l : Trigger.new) {
            System.debug('[DEBUG] Processing lead after update: ' + l.Id);
            // Missing error handling
            LeadTriggerHandler.handleAfterUpdate(l, Trigger.oldMap.get(l.Id));
        }
    }
    
    System.debug('=== LeadTrigger END ===');
}

