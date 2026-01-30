# User, Role & Permission System

Enterprise backend system for managing users, roles, and permissions with RBAC (Role-Based Access Control) logic.

## Features

- User management with CRUD operations
- Role management
- Permission management
- RBAC authorization logic
- JWT authentication
- Database migrations

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up PostgreSQL database:
```bash
createdb rbac_db
```

3. Run migrations:
```bash
npm run migrate
```

4. Update database configuration in `src/config/database.ts`

5. Build and run:
```bash
npm run build
npm start
```

Or for development:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## Project Structure

```
src/
├── config/
│   ├── database.ts        # Database configuration
│   └── app.ts             # App configuration
├── models/
│   ├── User.ts            # User model
│   ├── Role.ts            # Role model
│   └── Permission.ts      # Permission model
├── services/
│   ├── UserService.ts     # User business logic
│   ├── RoleService.ts     # Role business logic
│   ├── PermissionService.ts # Permission business logic
│   └── AuthService.ts     # Authentication logic
├── controllers/
│   ├── UserController.ts  # User endpoints
│   ├── RoleController.ts  # Role endpoints
│   └── AuthController.ts  # Auth endpoints
├── middleware/
│   └── auth.ts           # Auth middleware
├── routes/
│   └── index.ts          # Route definitions
├── utils/
│   ├── logger.ts         # Logging utilities
│   └── validators.ts      # Validation utilities
├── migrations/
│   └── 001_initial_schema.sql # Database schema
├── tests/
│   └── unit/             # Unit tests only
└── server.ts              # Express server
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/check-permission/:userId` - Check user permission
- `POST /api/auth/has-role/:userId` - Check user role

### Users
- `GET /api/users` - Get all users (no pagination)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/:id/roles` - Get user roles

### Roles
- `GET /api/roles` - Get all roles (no pagination)
- `GET /api/roles/:id` - Get role by ID
- `POST /api/roles` - Create role
- `PUT /api/roles/:id` - Update role
- `DELETE /api/roles/:id` - Delete role
- `GET /api/roles/:id/permissions` - Get role permissions

### Permissions
- `GET /api/permissions` - Get all permissions (no pagination)
- `GET /api/permissions/:id` - Get permission by ID

## Known Issues

- Inconsistent authorization checks across endpoints
- Hardcoded admin roles and user IDs
- Missing audit logs
- Partial exception handling
- No integration tests
- SQL injection risks in some queries
- Performance bottlenecks (no caching, small connection pool)
- Dead code in multiple files
- No pagination on list endpoints
