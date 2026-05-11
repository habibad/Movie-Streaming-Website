import type { Request, Response, NextFunction } from 'express';
import prisma from '../config/db.js';
import { AppError } from '../middleware/errorHandler.js';
import type { CreateEpisodeBody } from '../types/index.js';

export async function getAllEpisodes(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const episodes = await prisma.episode.findMany({
      orderBy: { scheduledAt: 'asc' },
    });
    res.json({ success: true, data: episodes });
  } catch (err) {
    next(err);
  }
}

export async function getNowPlaying(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const episode = await prisma.episode.findFirst({ where: { isLive: true } });
    res.json({ success: true, data: episode ?? null });
  } catch (err) {
    next(err);
  }
}

export async function getUpcoming(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const episodes = await prisma.episode.findMany({
      where: { status: 'scheduled' },
      orderBy: { scheduledAt: 'asc' },
      take: 10,
    });
    res.json({ success: true, data: episodes });
  } catch (err) {
    next(err);
  }
}

export async function createEpisode(
  req: Request<unknown, unknown, CreateEpisodeBody>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const episode = await prisma.episode.create({
      data: {
        ...req.body,
        scheduledAt: new Date(req.body.scheduledAt),
        endsAt: new Date(req.body.endsAt),
      },
    });
    res.status(201).json({ success: true, data: episode });
  } catch (err) {
    next(err);
  }
}

export async function getEpisodeById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const ep = await prisma.episode.findUnique({ where: { id: req.params.id } });
    if (!ep) return next(new AppError('Episode not found', 404));
    res.json({ success: true, data: ep });
  } catch (err) {
    next(err);
  }
}
