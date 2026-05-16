import type { Request, Response } from 'express';
import { prisma } from '../../../../lib/prisma';

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts: ", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};