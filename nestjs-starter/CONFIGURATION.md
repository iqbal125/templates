# Configuration Guide

## Overview

This NestJS application uses the `@nestjs/config` module for managing environment-based configuration. All configuration is centralized in `src/utils/app.config.ts` and loaded from the `.env` file.

Configuration validation is handled by **Joi**, ensuring that all environment variables meet the required constraints before the application starts. This prevents runtime errors caused by misconfiguration.

## Configuration Modules

### 1. App Configuration
Located in `appConfig` - manages application-level settings.

**Environment Variables:**
- `NODE_ENV`: Application environment (development, production, test)
- `PORT`: Port number the application runs on (default: 3000)
- `APP_NAME`: Application name
- `APP_VERSION`: Application version

**Usage:**
```typescript
import { ConfigService } from '@nestjs/config';

constructor(private configService: ConfigService) {}

const port = this.configService.get<number>('app.port');
const env = this.configService.get<string>('app.nodeEnv');
```

### 2. Database Configuration
Located in `databaseConfig` - manages database connection settings.

**Environment Variables:**
- `DATABASE_URL`: PostgreSQL connection string for Prisma

**Usage:**
```typescript
const dbUrl = this.configService.get<string>('database.url');
```

### 3. JWT Configuration
Located in `jwtConfig` - manages JWT authentication settings.

**Environment Variables:**
- `JWT_SECRET`: Secret key for signing JWT tokens (REQUIRED)
- `JWT_EXPIRATION`: Token expiration time (e.g., '7d', '24h', '30m')

**Usage:**
```typescript
const secret = this.configService.get<string>('jwt.secret');
const expiration = this.configService.get<string>('jwt.expiration');
```

### 4. Swagger Configuration
Located in `swaggerConfig` - manages API documentation settings.

**Environment Variables:**
- `SWAGGER_TITLE`: API documentation title
- `SWAGGER_DESCRIPTION`: API description
- `SWAGGER_VERSION`: API version

**Usage:**
```typescript
const title = this.configService.get<string>('swagger.title');
```

### 5. CORS Configuration
Located in `corsConfig` - manages Cross-Origin Resource Sharing.

**Environment Variables:**
- `CORS_ENABLED`: Enable/disable CORS (true/false)
- `CORS_ORIGIN`: Allowed origins for CORS

**Usage:**
```typescript
const enabled = this.configService.get<boolean>('cors.enabled');
const origin = this.configService.get<string>('cors.origin');
```

## Using Configuration in Your Code

### In Services/Controllers

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MyService {
  constructor(private configService: ConfigService) {}

  someMethod() {
    const appName = this.configService.get<string>('app.appName');
    const port = this.configService.get<number>('app.port');
    
    // With default value
    const timeout = this.configService.get<number>('app.timeout', 5000);
  }
}
```

### In Modules (Async Registration)

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SomeModule } from 'some-library';

@Module({
  imports: [
    SomeModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get<string>('someModule.apiKey'),
        timeout: configService.get<number>('someModule.timeout'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

## Adding New Configuration

To add new configuration options:

1. **Update `.env` file:**
```env
NEW_CONFIG_VALUE=some-value
NEW_CONFIG_OPTION=123
```

2. **Add validation to Joi schema in `app.config.ts`:**
```typescript
export const validationSchema = Joi.object({
  // ... existing validation
  
  // New configuration
  NEW_CONFIG_VALUE: Joi.string()
    .required()
    .min(5)
    .description('Description of the new config value'),
  NEW_CONFIG_OPTION: Joi.number()
    .default(0)
    .min(0)
    .max(1000),
});
```

3. **Add interface in `app.config.ts`:**
```typescript
export interface NewConfig {
  value: string;
  option: number;
}
```

4. **Create configuration function:**
```typescript
export const newConfig = registerAs('newConfig', (): NewConfig => ({
  value: process.env.NEW_CONFIG_VALUE || 'default',
  option: parseInt(process.env.NEW_CONFIG_OPTION || '0', 10),
}));
```

5. **Register in `app.module.ts`:**
```typescript
import { newConfig } from './utils/app.config';

ConfigModule.forRoot({
  // ... other config
  load: [appConfig, databaseConfig, jwtConfig, swaggerConfig, corsConfig, newConfig],
})
```

6. **Use in your code:**
```typescript
const value = this.configService.get<string>('newConfig.value');
```

## Environment-Specific Configuration

You can create different `.env` files for different environments:

- `.env` - Default environment file
- `.env.development` - Development environment
- `.env.production` - Production environment
- `.env.test` - Test environment

Load specific environment file:
```typescript
ConfigModule.forRoot({
  envFilePath: `.env.${process.env.NODE_ENV}`,
  // ... other config
})
```

## Validation Schema

The application uses **Joi** for robust validation of environment variables. The validation schema is defined in `src/utils/app.config.ts`.

### Validation Rules

**Application:**
- `NODE_ENV`: Must be one of: development, production, test, staging (default: development)
- `PORT`: Must be a valid port number (default: 3000)
- `APP_NAME`: String (default: NestJS API)
- `APP_VERSION`: String (default: 1.0.0)

**Database:**
- `DATABASE_URL`: **Required** - PostgreSQL connection string

**JWT:**
- `JWT_SECRET`: **Required** - Minimum 32 characters for security
- `JWT_EXPIRATION`: Must match pattern: number + unit (s|m|h|d), e.g., "7d", "24h" (default: 7d)

**Swagger:**
- `SWAGGER_TITLE`: String (default: API Documentation)
- `SWAGGER_DESCRIPTION`: String (default: API Description)
- `SWAGGER_VERSION`: String (default: 1.0)

**CORS:**
- `CORS_ENABLED`: Boolean (default: true)
- `CORS_ORIGIN`: String (default: *)

### Validation Behavior

The application will **fail to start** if:
- Required environment variables are missing (`DATABASE_URL`, `JWT_SECRET`)
- Values don't meet validation constraints (e.g., JWT_SECRET < 32 characters)
- Values are of incorrect type (e.g., PORT is not a number)
- Values don't match expected patterns (e.g., JWT_EXPIRATION format)

This "fail-fast" approach ensures configuration issues are caught immediately during startup rather than causing runtime errors.

## Best Practices

1. **Never commit `.env` files** - Add to `.gitignore`
2. **Always provide `.env.example`** - Document all required variables
3. **Use TypeScript interfaces** - Ensure type safety
4. **Validate required variables** - Joi validates on startup (fail fast)
5. **Use default values** - For non-critical configuration
6. **Group related config** - Keep configuration organized by domain
7. **Document environment variables** - Maintain this guide
8. **Use strong secrets** - JWT_SECRET must be at least 32 characters

## Security Considerations

- Never expose sensitive values (secrets, passwords) in logs
- Use strong, random values for `JWT_SECRET` in production
- Rotate secrets regularly
- Use environment-specific credentials
- Consider using secret management services (AWS Secrets Manager, Azure Key Vault, etc.)

## Troubleshooting

### Configuration not loading
- Ensure `.env` file exists in the project root
- Check file permissions
- Verify `ConfigModule.forRoot()` is called in `AppModule`
- Ensure `isGlobal: true` is set for global access

### Type errors when accessing config
- Verify the configuration path is correct (e.g., 'app.port')
- Check that the configuration is loaded in the `load` array
- Ensure you're using the correct type parameter

### Environment variables not updating
- Restart the application after changing `.env`
- Check if caching is enabled (`cache: true`)
- Verify the correct environment file is being loaded
