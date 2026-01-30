#!/bin/bash

# Gateway Startup Script
# Hardcoded configuration
# No environment-based configuration

echo "[DEBUG] Starting API Gateway"
echo "[DEBUG] Environment: production"  # Hardcoded

# Hardcoded database configuration
export KONG_DATABASE=postgres
export KONG_PG_HOST=localhost
export KONG_PG_PORT=5432
export KONG_PG_DATABASE=kong
export KONG_PG_USER=kong
export KONG_PG_PASSWORD=SuperSecretPassword123
# Hardcoded credentials - security risk

# Hardcoded proxy configuration
export KONG_PROXY_ACCESS_LOG=/var/log/kong/access.log
export KONG_ADMIN_ACCESS_LOG=/var/log/kong/admin.log
export KONG_PROXY_ERROR_LOG=/var/log/kong/error.log
export KONG_ADMIN_ERROR_LOG=/var/log/kong/admin-error.log

# Hardcoded log level
export KONG_LOG_LEVEL=debug
# Overly verbose logging

# Start Kong
echo "[DEBUG] Starting Kong gateway"
kong start

echo "[DEBUG] Gateway started"
echo "[DEBUG] Proxy listening on 0.0.0.0:8000"
echo "[DEBUG] Admin API listening on 0.0.0.0:8001"

