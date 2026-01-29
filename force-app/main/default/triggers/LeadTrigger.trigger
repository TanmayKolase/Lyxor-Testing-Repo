trigger LeadTrigger on Lead (before insert, before update, after insert, after update) {
    
    // No bulkification - processes records one at a time
    // Governor limit risk - will hit limits with large data volumes
    
    if (Trigger.isBefore && Trigger.isInsert) {
        // Processes records individually - not bulkified
        for (Lead lead : Trigger.new) {
            LeadHandler.handleBeforeInsert(lead);
        }
    }
    
    if (Trigger.isBefore && Trigger.isUpdate) {
        // Processes records individually - not bulkified
        for (Lead lead : Trigger.new) {
            Lead oldLead = Trigger.oldMap.get(lead.Id);
            LeadHandler.handleBeforeUpdate(lead, oldLead);
        }
    }
    
    if (Trigger.isAfter && Trigger.isInsert) {
        // Processes records individually - not bulkified
        // Governor limit risk - DML operations in loop
        for (Lead lead : Trigger.new) {
            LeadHandler.handleAfterInsert(lead);
        }
    }
    
    if (Trigger.isAfter && Trigger.isUpdate) {
        // Processes records individually - not bulkified
        for (Lead lead : Trigger.new) {
            Lead oldLead = Trigger.oldMap.get(lead.Id);
            LeadHandler.handleAfterUpdate(lead, oldLead);
        }
    }
}

