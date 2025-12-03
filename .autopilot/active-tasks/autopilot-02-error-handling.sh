#!/bin/bash
# Task: Add Error Handling to API Routes

# Create error handling utility
cat > lib/api-error-handler.ts << 'ERRORHANDLER'
import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof ApiError) {
    logger.error('API Error', error);
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.statusCode }
    );
  }

  if (error instanceof Error) {
    logger.error('Unexpected Error', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }

  logger.error('Unknown Error', { error });
  return NextResponse.json(
    { error: 'An unexpected error occurred' },
    { status: 500 }
  );
}

export function withErrorHandling<T>(
  handler: () => Promise<T>
): Promise<T | NextResponse> {
  return handler().catch(handleApiError);
}
ERRORHANDLER

echo "✅ Created error handling utility"
echo "⚠️  Manual step required: Wrap all API route handlers with try-catch"
