export declare class ApiError extends Error {
  status: number;
  constructor(status: number, message: string);
}

export {};
