# Task Management System - Validation Rules

This document outlines the validation rules implemented using Zod for the Task Management System.

## Project Validation

**Schema**: `createProjectSchema(existingProjectNames: string[])`

- **Name**: 
  - Required
  - Minimum length: 3 characters
  - Maximum length: 100 characters
  - **Unique**: Must not match any existing project name (case-insensitive)

The schema uses a factory function that accepts existing project names to validate uniqueness. The validation is case-insensitive, so "My Project" and "my project" are considered duplicates.

## Task Validation

**Schema**: `taskSchema`

- **Title**: 
  - Required
  - Minimum length: 3 characters
  - Maximum length: 200 characters

- **Description**: 
  - Required
  - Minimum length: 10 characters
  - Maximum length: 1000 characters

## Comment Validation

**Schema**: `commentSchema`

- **Text**: 
  - Required
  - Minimum length: 2 characters
  - Maximum length: 500 characters

## Implementation

All forms now use React Hook Form with Zod validation:

- **ProjectList**: Validates project name before creation
- **TaskList**: Validates task title and description
- **TaskItem**: Validates comment text before posting

Validation errors are displayed in real-time below each input field with red text and red input borders.
