import { Router } from 'express';
import { getAllUsers } from './user.controller';


const userRouter = Router();

userRouter.get("/all-users", getAllUsers);
export default userRouter ;