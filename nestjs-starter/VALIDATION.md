# Environment Variable Validation with Joi

This document explains how Joi validation works in this NestJS application.

## Overview

The application uses Joi to validate environment variables on startup. If validation fails, the application will not start and will display detailed error messages.

## Validation Schema Location

The Joi validation schema is defined in `src/utils/app.config.ts`:

```typescript
export const validationSchema = Joi.object({
  // Application settings
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'staging')
    .default('development'),
  
  // Database - REQUIRED
  DATABASE_URL: Joi.string()
    .required()
    .description('PostgreSQL database connection URL'),
  
  // JWT - REQUIRED with minimum length
  JWT_SECRET: Joi.string()
    .required()
    .min(32)
    .description('JWT secret key (minimum 32 characters for security)'),
  
  // Pattern validation for JWT expiration
  JWT_EXPIRATION: Joi.string()
    .default('7d')
    .pattern(/^(\d+)(s|m|h|d)$/)
    .description('JWT expiration time (e.g., 30s, 5m, 24h, 7d)'),
  
  // ... more validations
});
```

## How It Works

### 1. Application Startup

When the application starts, the ConfigModule loads the `.env` file and validates all environment variables against the Joi schema:

```typescript
// In app.module.ts
ConfigModule.forRoot({
  isGlobal: true,
  validationSchema: validationSchema,
  validationOptions: {
    allowUnknown: true,    // Allow unknown variables (won't fail)
    abortEarly: false,     // Show all errors, not just the first one
  },
})
```

### 2. Validation Success

If all environment variables pass validation, the application starts normally:

```bash
🚀 NestJS API is running on: http://localhost:3000
📚 Swagger documentation: http://localhost:3000/api
```

### 3. Validation Failure

If validation fails, the application will **not start** and will display detailed error messages:

```bash
Error: Config validation error: "JWT_SECRET" length must be at least 32 characters long
Error: Config validation error: "DATABASE_URL" is required
```

## Common Validation Scenarios

### Example 1: Missing Required Variable

`.env`:
```env
# DATABASE_URL is missing
JWT_SECRET=my-super-secure-secret-key-here
```

**Result**: Application fails to start
**Error**: `"DATABASE_URL" is required`

### Example 2: JWT_SECRET Too Short

`.env`:
```env
DATABASE_URL=postgresql://localhost:5432/db
JWT_SECRET=short
```

**Result**: Application fails to start
**Error**: `"JWT_SECRET" length must be at least 32 characters long`

### Example 3: Invalid NODE_ENV

`.env`:
```env
NODE_ENV=invalid-env
DATABASE_URL=postgresql://localhost:5432/db
JWT_SECRET=my-super-secure-secret-key-here
```

**Result**: Application fails to start
**Error**: `"NODE_ENV" must be one of [development, production, test, staging]`

### Example 4: Invalid JWT_EXPIRATION Pattern

`.env`:
```env
DATABASE_URL=postgresql://localhost:5432/db
JWT_SECRET=my-super-secure-secret-key-here
JWT_EXPIRATION=7days  # Wrong! Should be "7d"
```

**Result**: Application fails to start
**Error**: `"JWT_EXPIRATION" with value "7days" fails to match the required pattern: /^(\d+)(s|m|h|d)$/`

### Example 5: Invalid PORT

`.env`:
```env
PORT=99999  # Port number too high (max 65535)
DATABASE_URL=postgresql://localhost:5432/db
JWT_SECRET=my-super-secure-secret-key-here
```

**Result**: Application fails to start
**Error**: `"PORT" must be a valid port`

## Validation Rules Summary

| Variable | Type | Required | Validation Rules | Default |
|----------|------|----------|------------------|---------|
| NODE_ENV | string | No | Must be: development, production, test, staging | development |
| PORT | number | No | Valid port number (1-65535) | 3000 |
| APP_NAME | string | No | Any string | NestJS API |
| APP_VERSION | string | No | Any string | 1.0.0 |
| DATABASE_URL | string | **Yes** | Non-empty string | - |
| JWT_SECRET | string | **Yes** | Minimum 32 characters | - |
| JWT_EXPIRATION | string | No | Pattern: `\d+(s|m|h|d)` | 7d |
| SWAGGER_TITLE | string | No | Any string | API Documentation |
| SWAGGER_DESCRIPTION | string | No | Any string | API Description |
| SWAGGER_VERSION | string | No | Any string | 1.0 |
| CORS_ENABLED | boolean | No | true or false | true |
| CORS_ORIGIN | string | No | Any string | * |

## Testing Validation

To test the validation, you can intentionally create invalid configurations:

### Test 1: Test Missing Required Variable
```bash
# Temporarily remove DATABASE_URL from .env
npm run start:dev
# Expected: Application fails with error about DATABASE_URL
```

### Test 2: Test JWT_SECRET Length
```bash
# In .env, set: JWT_SECRET=short
npm run start:dev
# Expected: Application fails with minimum length error
```

### Test 3: Test Valid Configuration
```bash
# Ensure all required variables are set correctly
npm run start:dev
# Expected: Application starts successfully
```

## Benefits of Joi Validation

1. **Fail Fast**: Configuration errors are caught at startup, not at runtime
2. **Clear Error Messages**: Joi provides detailed, human-readable error messages
3. **Type Coercion**: Joi can convert string values to proper types (e.g., "3000" → 3000)
4. **Default Values**: Missing optional values are automatically filled with defaults
5. **Pattern Matching**: Complex validation rules like regex patterns for JWT_EXPIRATION
6. **Security**: Enforces security rules (e.g., minimum JWT_SECRET length)
7. **Documentation**: The schema serves as documentation for required configuration

## Adding Custom Validations

To add custom validation rules:

```typescript
// In app.config.ts
export const validationSchema = Joi.object({
  // ... existing validations
  
  // Custom email validation
  ADMIN_EMAIL: Joi.string()
    .email()
    .required()
    .description('Administrator email address'),
  
  // Custom URL validation
  API_BASE_URL: Joi.string()
    .uri()
    .default('http://localhost:3000'),
  
  // Custom number range
  MAX_CONNECTIONS: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10),
  
  // Custom enum with multiple options
  LOG_LEVEL: Joi.string()
    .valid('error', 'warn', 'info', 'debug', 'verbose')
    .default('info'),
});
```

## Troubleshooting

### Validation Errors Don't Show
- Ensure `validationSchema` is passed to `ConfigModule.forRoot()`
- Check that `validationOptions.abortEarly` is set to `false` to see all errors

### Application Starts Despite Invalid Config
- Verify the Joi schema is correctly imported in `app.module.ts`
- Check for typos in environment variable names

### Type Coercion Not Working
- Ensure you're using the correct Joi type (e.g., `Joi.number()` for numbers)
- Check that the value in `.env` can be coerced (e.g., "abc" cannot become a number)

## References

- [Joi Documentation](https://joi.dev/api/)
- [NestJS Config Module](https://docs.nestjs.com/techniques/configuration)
- [Environment Variables Best Practices](https://12factor.net/config)
