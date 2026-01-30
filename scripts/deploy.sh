#!/bin/bash

# Deployment script
# No rollback strategy
# Poor error handling
# Hardcoded secrets
# No environment separation

set -e  # Exits on error but no proper error handling

# Hardcoded secrets in script
AWS_REGION="us-east-1"
S3_BUCKET="myapp-deployments"
EC2_INSTANCE="i-1234567890abcdef0"
DB_HOST="production-db.example.com"
DB_PASSWORD="hardcoded_password_123"

# No environment separation
# Always deploys to production
ENVIRONMENT="production"

echo "[DEBUG] Starting deployment to $ENVIRONMENT"
echo "[DEBUG] AWS Region: $AWS_REGION"
echo "[DEBUG] S3 Bucket: $S3_BUCKET"

# No error handling
# No validation of inputs
# No rollback on failure

# Upload to S3
echo "[DEBUG] Uploading to S3..."
aws s3 cp build/ s3://$S3_BUCKET/ --recursive
# No error handling for S3 upload failure
# No verification of upload

# Deploy to EC2
echo "[DEBUG] Deploying to EC2..."
ssh -i ~/.ssh/deploy_key.pem ec2-user@$EC2_INSTANCE "cd /var/www/myapp && git pull origin main"
# Hardcoded SSH key path
# No error handling for SSH failure
# No rollback if deployment fails

# Restart services
echo "[DEBUG] Restarting services..."
ssh -i ~/.ssh/deploy_key.pem ec2-user@$EC2_INSTANCE "sudo systemctl restart myapp"
# No error handling
# No health check after restart
# No rollback if restart fails

# Update database
echo "[DEBUG] Running database migrations..."
export PGPASSWORD=$DB_PASSWORD
psql -h $DB_HOST -U admin -d myapp -f migrations/latest.sql
# Hardcoded database credentials
# No error handling for migration failure
# No rollback for failed migrations

echo "[DEBUG] Deployment completed"
# No verification that deployment was successful
# No rollback strategy

