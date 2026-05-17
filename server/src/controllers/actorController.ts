import type { Request, Response, NextFunction } from 'express';
import {prisma} from '../../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import type { CreateActorBody } from '../types/index';

export async function getAllActors(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const actors = await prisma.actor.findMany({ orderBy: { name: 'asc' } });
    res.json({ success: true, data: actors });
  } catch (err) {
    next(err);
  }
}

export async function getActorById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const actor = await prisma.actor.findUnique({ where: { id: req.params.id } });
    if (!actor) return next(new AppError('Actor not found', 404));
    res.json({ success: true, data: actor });
  } catch (err) {
    next(err);
  }
}

// export async function createActor(
//   req: Request<unknown, unknown, CreateActorBody>,
//   res: Response,
//   next: NextFunction
// ): Promise<void> {
//   try {
//     const actor = await prisma.actor.create({ data: req.body });
//     res.status(201).json({ success: true, data: actor });
//   } catch (err) {
//     next(err);
//   }
// }

// export async function updateActor(
//   req: Request<{ id: string }, unknown, Partial<CreateActorBody>>,
//   res: Response,
//   next: NextFunction
// ): Promise<void> {
//   try {
//     const existing = await prisma.actor.findUnique({ where: { id: req.params.id } });
//     if (!existing) return next(new AppError('Actor not found', 404));
//     const actor = await prisma.actor.update({ where: { id: req.params.id }, data: req.body });
//     res.json({ success: true, data: actor });
//   } catch (err) {
//     next(err);
//   }
// }
