import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface AppConfig {
    nodeEnv: string;
    port: number;
    appName: string;
    appVersion: string;
}

export interface DatabaseConfig {
    url: string;
}

export interface JwtConfig {
    secret: string;
    expiration: string;
}

export interface SwaggerConfig {
    title: string;
    description: string;
    version: string;
}

export interface CorsConfig {
    enabled: boolean;
    origin: string;
}

export const appConfig = registerAs('app', (): AppConfig => ({
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),
    appName: process.env.APP_NAME || 'NestJS API',
    appVersion: process.env.APP_VERSION || '1.0.0',
}));

export const databaseConfig = registerAs('database', (): DatabaseConfig => ({
    url: process.env.DATABASE_URL || '',
}));

export const jwtConfig = registerAs('jwt', (): JwtConfig => ({
    secret: process.env.JWT_SECRET || 'default-secret-change-me',
    expiration: process.env.JWT_EXPIRATION || '24h',
}));

export const swaggerConfig = registerAs('swagger', (): SwaggerConfig => ({
    title: process.env.SWAGGER_TITLE || 'API Documentation',
    description: process.env.SWAGGER_DESCRIPTION || 'API Description',
    version: process.env.SWAGGER_VERSION || '1.0',
}));

export const corsConfig = registerAs('cors', (): CorsConfig => ({
    enabled: process.env.CORS_ENABLED === 'true',
    origin: process.env.CORS_ORIGIN || '*',
}));

export const validationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'staging')
        .default('development'),
    PORT: Joi.number()
        .port()
        .default(3000),
    APP_NAME: Joi.string()
        .default('NestJS API'),
    APP_VERSION: Joi.string()
        .default('1.0.0'),
    DATABASE_URL: Joi.string()
        .required()
        .description('PostgreSQL database connection URL'),
    JWT_SECRET: Joi.string()
        .required()
        .min(32)
        .description('JWT secret key (minimum 32 characters for security)'),
    JWT_EXPIRATION: Joi.string()
        .default('7d')
        .pattern(/^(\d+)(s|m|h|d)$/)
        .description('JWT expiration time (e.g., 30s, 5m, 24h, 7d)'),
    SWAGGER_TITLE: Joi.string()
        .default('API Documentation'),
    SWAGGER_DESCRIPTION: Joi.string()
        .default('API Description'),
    SWAGGER_VERSION: Joi.string()
        .default('1.0'),
    CORS_ENABLED: Joi.boolean()
        .default(true),
    CORS_ORIGIN: Joi.string()
        .default('*')
        .description('Allowed CORS origins (use * for all origins)'),
});
