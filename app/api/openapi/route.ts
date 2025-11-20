// app/api/openapi/route.ts
// OpenAPI 3.0 specification for Elevate for Humanity API
import { NextResponse } from 'next/server';

export async function GET() {
  const openapi = {
    openapi: '3.0.3',
    info: {
      title: 'Elevate for Humanity LMS API',
      version: '1.0.0',
      description:
        'REST API documentation for the Elevate for Humanity workforce training and LMS platform.',
      contact: {
        name: 'Elevate for Humanity',
        email: 'support@elevateforhumanity.org',
        url: 'https://www.elevateforhumanity.org',
      },
      license: {
        name: 'Proprietary',
        url: 'https://www.elevateforhumanity.org/terms',
      },
    },
    servers: [{ url: '/api', description: 'Current environment' }],
    tags: [
      { name: 'Auth', description: 'Authentication and user management' },
      { name: 'Courses', description: 'Course management' },
      { name: 'Enrollments', description: 'Student enrollments' },
      { name: 'HR', description: 'Human resources and payroll' },
      { name: 'Marketing', description: 'Marketing automation' },
      { name: 'Events', description: 'Events management' },
      { name: 'SSO', description: 'Single Sign-On configuration' },
    ],
    paths: {
      '/auth/register': {
        post: {
          summary: 'Register a new user',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string',
                      format: 'email',
                      example: 'user@example.com',
                    },
                    password: {
                      type: 'string',
                      format: 'password',
                      description:
                        'Must be at least 8 characters with uppercase, lowercase, number, and special character',
                      example: 'SecurePass123!',
                    },
                    tenantId: { type: 'string', format: 'uuid' },
                    firstName: { type: 'string', example: 'John' },
                    lastName: { type: 'string', example: 'Doe' },
                    role: {
                      type: 'string',
                      enum: ['student', 'instructor', 'admin'],
                      example: 'student',
                    },
                  },
                  required: ['email', 'password'],
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'User created successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      user: {
                        type: 'object',
                        properties: {
                          id: { type: 'string', format: 'uuid' },
                          email: { type: 'string', format: 'email' },
                          role: { type: 'string' },
                        },
                      },
                    },
                  },
                },
              },
            },
            '400': {
              description: 'Validation error or user already exists',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: { type: 'string' },
                    },
                  },
                },
              },
            },
            '429': {
              description: 'Too many requests',
            },
          },
        },
      },
      '/courses': {
        get: {
          summary: 'List all courses',
          tags: ['Courses'],
          parameters: [
            {
              name: 'page',
              in: 'query',
              schema: { type: 'integer', default: 1 },
            },
            {
              name: 'limit',
              in: 'query',
              schema: { type: 'integer', default: 20 },
            },
          ],
          responses: {
            '200': {
              description: 'List of courses',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      courses: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: { type: 'string', format: 'uuid' },
                            title: { type: 'string' },
                            description: { type: 'string' },
                            duration_hours: { type: 'number' },
                            is_published: { type: 'boolean' },
                          },
                        },
                      },
                      total: { type: 'integer' },
                      page: { type: 'integer' },
                      limit: { type: 'integer' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/enrollments': {
        post: {
          summary: 'Enroll a student in a course',
          tags: ['Enrollments'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    courseId: { type: 'string', format: 'uuid' },
                    studentId: { type: 'string', format: 'uuid' },
                  },
                  required: ['courseId', 'studentId'],
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Enrollment created',
            },
            '400': {
              description: 'Invalid request',
            },
          },
        },
      },
      '/hr/employees': {
        get: {
          summary: 'List all employees',
          tags: ['HR'],
          responses: {
            '200': {
              description: 'List of employees',
            },
          },
        },
        post: {
          summary: 'Create a new employee',
          tags: ['HR'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    firstName: { type: 'string' },
                    lastName: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    departmentId: { type: 'string', format: 'uuid' },
                    position: { type: 'string' },
                    salary: { type: 'number' },
                  },
                  required: ['firstName', 'lastName', 'email', 'position'],
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Employee created',
            },
          },
        },
      },
      '/marketing/campaigns': {
        get: {
          summary: 'List marketing campaigns',
          tags: ['Marketing'],
          responses: {
            '200': {
              description: 'List of campaigns',
            },
          },
        },
      },
      '/events': {
        get: {
          summary: 'List events',
          tags: ['Events'],
          responses: {
            '200': {
              description: 'List of events',
            },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        apiKey: {
          type: 'apiKey',
          in: 'header',
          name: 'X-API-Key',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            message: { type: 'string' },
            code: { type: 'string' },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }, { apiKey: [] }],
  };

  return NextResponse.json(openapi);
}
