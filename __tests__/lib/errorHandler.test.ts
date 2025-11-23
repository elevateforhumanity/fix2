import { 
  AppError, 
  ValidationError, 
  AuthenticationError, 
  AuthorizationError, 
  NotFoundError,
  handleError,
  withErrorHandling 
} from '@/lib/errorHandler';

describe('Error Classes', () => {
  it('creates AppError with correct properties', () => {
    const error = new AppError('Test error', 500);
    expect(error.message).toBe('Test error');
    expect(error.statusCode).toBe(500);
    expect(error.isOperational).toBe(true);
  });

  it('creates ValidationError with 400 status', () => {
    const error = new ValidationError('Invalid input');
    expect(error.statusCode).toBe(400);
  });

  it('creates AuthenticationError with 401 status', () => {
    const error = new AuthenticationError();
    expect(error.statusCode).toBe(401);
  });

  it('creates AuthorizationError with 403 status', () => {
    const error = new AuthorizationError();
    expect(error.statusCode).toBe(403);
  });

  it('creates NotFoundError with 404 status', () => {
    const error = new NotFoundError();
    expect(error.statusCode).toBe(404);
  });
});

describe('handleError', () => {
  it('handles AppError correctly', () => {
    const error = new AppError('Test error', 400);
    const result = handleError(error);
    expect(result.message).toBe('Test error');
    expect(result.statusCode).toBe(400);
  });

  it('handles generic Error', () => {
    const error = new Error('Generic error');
    const result = handleError(error);
    expect(result.message).toBeTruthy();
    expect(result.statusCode).toBe(500);
  });

  it('handles unknown errors', () => {
    const result = handleError('string error');
    expect(result.message).toBe('An unknown error occurred');
    expect(result.statusCode).toBe(500);
  });
});

describe('withErrorHandling', () => {
  it('returns data on success', async () => {
    const fn = async () => 'success';
    const result = await withErrorHandling(fn);
    expect(result.data).toBe('success');
    expect(result.error).toBeUndefined();
  });

  it('returns error on failure', async () => {
    const fn = async () => {
      throw new Error('Test error');
    };
    const result = await withErrorHandling(fn);
    expect(result.data).toBeUndefined();
    expect(result.error).toBeTruthy();
  });
});
