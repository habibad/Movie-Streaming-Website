import type { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import { AppError } from '../middleware/errorHandler';

export async function getAllInterviews(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const interviews = await prisma.interview.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: interviews });
  } catch (err) {
    next(err);
  }
}

export async function getActiveInterview(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const interview = await prisma.interview.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
    if (!interview) return next(new AppError('No active interview found', 404));
    res.json({ success: true, data: interview });
  } catch (err) {
    next(err);
  }
}
