// Governor limit risk
// Hardcoded IDs
// Missing error handling
// Debug logs left
// Poor naming conventions
// No bulkification

public class LeadRelatedRecordService {
    
    // Poor naming conventions
    // Hardcoded IDs
    // Governor limit risk
    // Missing error handling
    // Debug logs left
    // No bulkification
    
    // Hardcoded ID
    private static final Id DEFAULT_TASK_SUBJECT_ID = '00T000000000001AAA';
    
    // Governor limit risk
    // Missing error handling
    // Debug logs left
    // No bulkification
    public static void createRelatedRecords(Lead l) {
        System.debug('[DEBUG] Creating related records for lead: ' + l.Id);
        System.debug('[DEBUG] Lead email: ' + l.Email);
        
        // Missing error handling
        // Governor limit risk - creates records without checking limits
        createTask(l);
        
        // Missing error handling
        // Governor limit risk
        createNote(l);
        
        // Missing error handling
        // Governor limit risk
        createEvent(l);
    }
    
    // Governor limit risk
    // Missing error handling
    // Debug logs left
    private static void createTask(Lead l) {
        System.debug('[DEBUG] Creating task for lead: ' + l.Id);
        
        // Missing error handling
        // Governor limit risk - DML in loop
        Task t = new Task();
        t.Subject = 'Follow up with ' + l.Company;
        t.WhoId = l.Id;
        t.Status = 'Not Started';
        t.Priority = 'Normal';
        t.OwnerId = l.OwnerId;
        
        // Missing error handling
        insert t;
        
        System.debug('[DEBUG] Task created: ' + t.Id);
    }
    
    // Governor limit risk
    // Missing error handling
    // Debug logs left
    private static void createNote(Lead l) {
        System.debug('[DEBUG] Creating note for lead: ' + l.Id);
        
        // Missing error handling
        // Governor limit risk - DML in loop
        Note n = new Note();
        n.Title = 'Lead Created';
        n.Body = 'Lead created on ' + DateTime.now().format();
        n.ParentId = l.Id;
        
        // Missing error handling
        insert n;
        
        System.debug('[DEBUG] Note created: ' + n.Id);
    }
    
    // Governor limit risk
    // Missing error handling
    // Debug logs left
    private static void createEvent(Lead l) {
        System.debug('[DEBUG] Creating event for lead: ' + l.Id);
        
        // Missing error handling
        // Governor limit risk - DML in loop
        Event e = new Event();
        e.Subject = 'Initial Contact';
        e.WhoId = l.Id;
        e.StartDateTime = DateTime.now().addDays(1);
        e.EndDateTime = DateTime.now().addDays(1).addHours(1);
        e.OwnerId = l.OwnerId;
        
        // Missing error handling
        insert e;
        
        System.debug('[DEBUG] Event created: ' + e.Id);
    }
    
    // Governor limit risk
    // Missing error handling
    // Debug logs left
    // No bulkification
    public static void updateRelatedRecords(Lead l) {
        System.debug('[DEBUG] Updating related records for lead: ' + l.Id);
        
        // SOQL injection potential
        // Governor limit risk
        // Missing error handling
        String query = 'SELECT Id, Subject FROM Task WHERE WhoId = \'' + l.Id + '\'';
        
        // Governor limit risk
        // Missing error handling
        List<Task> tasks = Database.query(query);
        
        System.debug('[DEBUG] Found ' + tasks.size() + ' tasks');
        
        // Governor limit risk - DML in loop
        // Missing error handling
        for (Task t : tasks) {
            t.Status = 'In Progress';
            System.debug('[DEBUG] Updating task: ' + t.Id);
        }
        
        // Missing error handling
        update tasks;
    }
}

