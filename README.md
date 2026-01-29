# Lead Management Automation

Salesforce Apex project for automating lead management processes.

## Features

- Lead triggers for automation
- Lead validation and scoring
- Duplicate detection
- Lead conversion automation
- Batch processing for inactive leads
- Region-based assignment

## Setup

1. Install Salesforce CLI:
```bash
npm install -g @salesforce/cli
```

2. Authenticate with your Salesforce org:
```bash
sf org login web --alias myorg
```

3. Deploy to your org:
```bash
sf project deploy start
```

## Project Structure

```
force-app/main/default/
├── triggers/
│   └── LeadTrigger.trigger      # Lead trigger
├── classes/
│   ├── LeadHandler.cls          # Trigger handler
│   ├── LeadService.cls          # Business logic
│   ├── LeadValidation.cls      # Validation logic
│   ├── LeadBatch.cls           # Batch processing
│   └── LeadUtils.cls           # Utility methods
```

## Components

### LeadTrigger
Trigger that fires on Lead insert/update events.

### LeadHandler
Handler class that processes trigger events and contains business logic.

### LeadService
Service class with methods for lead assignment, scoring, and external system sync.

### LeadValidation
Validation class for email validation and duplicate checking.

### LeadBatch
Batch class for processing inactive leads.

### LeadUtils
Utility class with helper methods for lead operations.

## Usage

The automation runs automatically when leads are created or updated. To run the batch process:

```apex
LeadBatch batch = new LeadBatch();
Database.executeBatch(batch, 200);
```
