import type { Request, Response, NextFunction } from 'express';
import prisma from '../config/db.js';
import { AppError } from '../middleware/errorHandler.js';
import type { CreateMovieBody, MovieQuery } from '../types/index.js';

export async function getAllMovies(
  req: Request<unknown, unknown, unknown, MovieQuery>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { category, featured, page = '1', limit = '20' } = req.query;

    const where: Record<string, unknown> = {};
    if (category) where.category = category;
    if (featured === 'true') where.isFeatured = true;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [movies, total] = await Promise.all([
      prisma.movie.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit),
      }),
      prisma.movie.count({ where }),
    ]);

    res.json({
      success: true,
      data: movies,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (err) {
    next(err);
  }
}

export async function getFeaturedMovies(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const movies = await prisma.movie.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: movies });
  } catch (err) {
    next(err);
  }
}

export async function getMovieById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const movie = await prisma.movie.findUnique({ where: { id: req.params.id } });
    if (!movie) return next(new AppError('Movie not found', 404));
    res.json({ success: true, data: movie });
  } catch (err) {
    next(err);
  }
}

export async function createMovie(
  req: Request<unknown, unknown, CreateMovieBody>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const movie = await prisma.movie.create({ data: req.body });
    res.status(201).json({ success: true, data: movie });
  } catch (err) {
    next(err);
  }
}

export async function updateMovie(
  req: Request<{ id: string }, unknown, Partial<CreateMovieBody>>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const existing = await prisma.movie.findUnique({ where: { id: req.params.id } });
    if (!existing) return next(new AppError('Movie not found', 404));
    const movie = await prisma.movie.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ success: true, data: movie });
  } catch (err) {
    next(err);
  }
}

export async function deleteMovie(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const existing = await prisma.movie.findUnique({ where: { id: req.params.id } });
    if (!existing) return next(new AppError('Movie not found', 404));
    await prisma.movie.delete({ where: { id: req.params.id } });
    res.json({ success: true, data: null, message: 'Movie deleted' });
  } catch (err) {
    next(err);
  }
}
