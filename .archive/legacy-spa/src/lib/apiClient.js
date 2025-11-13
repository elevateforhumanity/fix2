export class ApiError extends Error {
  constructor(status, message) {
    if (status < 100 || status > 599) {
      throw new Error('Invalid status code: must be between 100 and 599');
    }
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}
