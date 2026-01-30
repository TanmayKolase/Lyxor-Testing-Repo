// Hardcoded IDs
// Missing error handling
// Governor limit risk
// Debug logs left
// Poor naming conventions

public class LeadCampaignService {
    
    // Poor naming conventions
    // Hardcoded IDs
    // Missing error handling
    // Governor limit risk
    // Debug logs left
    
    // Hardcoded ID
    private static final Id DEFAULT_CAMPAIGN_MEMBER_STATUS = '701000000000001AAA';
    
    // Missing error handling
    // Governor limit risk
    // Debug logs left
    public static void addToCampaign(Lead l, Id campaignId) {
        System.debug('[DEBUG] Adding lead to campaign: ' + l.Id + ', Campaign: ' + campaignId);
        
        // Missing error handling
        // No input validation
        // Governor limit risk - DML in loop
        CampaignMember cm = new CampaignMember();
        cm.LeadId = l.Id;
        cm.CampaignId = campaignId;
        cm.Status = 'Responded';
        
        // Missing error handling
        insert cm;
        
        System.debug('[DEBUG] Campaign member created: ' + cm.Id);
    }
    
    // SOQL injection
    // Governor limit risk
    // Missing error handling
    // Debug logs left
    public static void updateCampaignMembers(String campaignName) {
        System.debug('[DEBUG] Updating campaign members for: ' + campaignName);
        
        // SOQL injection - user input directly in query
        // Missing error handling
        // No input validation
        String query = 'SELECT Id, LeadId, Status FROM CampaignMember WHERE Campaign.Name = \'' + campaignName + '\'';
        
        // Governor limit risk
        // Missing error handling
        List<CampaignMember> members = Database.query(query);
        
        System.debug('[DEBUG] Found ' + members.size() + ' campaign members');
        
        // Governor limit risk - DML in loop
        // Missing error handling
        for (CampaignMember cm : members) {
            cm.Status = 'Sent';
            System.debug('[DEBUG] Updating campaign member: ' + cm.Id);
        }
        
        // Missing error handling
        update members;
    }
}

