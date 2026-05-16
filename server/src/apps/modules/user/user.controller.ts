import type { Request, Response } from "express";
import { prisma } from "../../../../lib/prisma";

export const getAllUsers =  async (req: Request, res: Response) => {

  try {
    const users = await prisma.user.findUnique({
        where:{
            email: "ha4168108@gmail.com"
        }
    })

    res.json(users);
  } catch (error) {
    console.error("Error fetching users: ", error);
  }

}