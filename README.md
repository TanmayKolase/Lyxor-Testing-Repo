# Central API Gateway Setup

API Gateway configuration for routing requests to multiple backend services with authentication forwarding and request/response logging.

## Features

- Route requests to multiple backend services
- Basic authentication forwarding
- Request/response logging
- Timeout configuration
- CORS support

## Setup

1. Install Kong API Gateway:
```bash
# Follow Kong installation guide for your platform
```

2. Set up PostgreSQL database:
```bash
createdb kong
```

3. Update database configuration in `config/gateway-config.yml`

4. Start the gateway:
```bash
chmod +x scripts/start-gateway.sh
./scripts/start-gateway.sh
```

The gateway will be available at `http://localhost:8000`

## Project Structure

```
├── kong.yml                    # Main gateway configuration (hardcoded URLs, missing auth, no rate limiting)
├── routes/
│   ├── user-routes.yml        # User service routes (hardcoded URLs, missing auth, dead routes)
│   ├── order-routes.yml       # Order service routes (hardcoded URLs, missing auth, dead routes)
│   └── payment-routes.yml     # Payment service routes (hardcoded URLs, missing auth, dead routes)
├── middleware/
│   ├── auth-middleware.yml    # Auth middleware (missing forwarding, hardcoded values)
│   ├── logging-middleware.yml # Logging middleware (verbose logging, sensitive data)
│   └── security-middleware.yml # Security middleware (insecure headers, no rate limiting)
├── services/
│   └── upstream-config.yml   # Upstream config (hardcoded URLs, no retry, missing timeout)
├── config/
│   └── gateway-config.yml    # Gateway config (hardcoded values, no env-based config)
├── plugins/
│   └── custom-logging.lua    # Custom plugin (verbose logging, sensitive data)
└── scripts/
    └── start-gateway.sh      # Startup script (hardcoded config)
```

## Known Issues

- No rate limiting configuration
- Missing authentication forwarding for some routes
- Hardcoded service URLs
- Missing request timeout handling
- No retry mechanism for upstream failures
- Insecure HTTP headers
- Overly verbose logging with sensitive data
- No environment-based configuration
- Dead or unused route configs
