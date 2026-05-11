import type { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
    return;
  }

  if (err instanceof Error) {
    console.error('[Error]', err.message);
    res.status(500).json({
      success: false,
      error:
        process.env.NODE_ENV === 'development'
          ? err.message
          : 'Internal server error',
    });
    return;
  }

  res.status(500).json({ success: false, error: 'Unknown error' });
}
