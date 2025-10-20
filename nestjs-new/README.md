<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository with integrated configuration management.

## Features

- 🔧 Centralized configuration management with `@nestjs/config`
- ✅ Environment variable validation with Joi
- 🔐 JWT Authentication
- 📊 Prisma ORM integration
- 📝 Swagger API documentation
- ✅ Input validation with class-validator
- 🏥 Health check endpoints
- 🐳 Docker support

## Installation

```bash
$ npm install
```

## Configuration

1. Copy the example environment file:
```bash
$ cp .env.example .env
```

2. Update the `.env` file with your configuration:

```env
# Application
NODE_ENV=development
PORT=3000
APP_NAME=NestJS API
APP_VERSION=0.1.0

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# JWT Authentication
# Must be at least 32 characters for security
JWT_SECRET=your-very-secure-secret-key-at-least-32-characters-long
JWT_EXPIRATION=7d

# API Documentation
SWAGGER_TITLE=NestJS API
SWAGGER_DESCRIPTION=The NestJS API description
SWAGGER_VERSION=0.1

# CORS
CORS_ENABLED=true
CORS_ORIGIN=http://localhost:3000
```

### Configuration Structure

The application uses a modular configuration approach located in `src/utils/app.config.ts`:

- **App Config**: Application-level settings (port, environment, name)
- **Database Config**: Database connection configuration
- **JWT Config**: Authentication settings
- **Swagger Config**: API documentation settings
- **CORS Config**: Cross-Origin Resource Sharing settings

All configurations are:
- ✅ **Type-safe** with TypeScript interfaces
- ✅ **Validated** with Joi schema on startup
- ✅ **Globally available** through `ConfigService`
- ✅ **Environment-specific** with default values

The application will fail to start if required environment variables are missing or invalid, ensuring configuration errors are caught early.

For detailed configuration documentation, see [CONFIGURATION.md](./CONFIGURATION.md).

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
