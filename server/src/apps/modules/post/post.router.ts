import {Router} from 'express';
import { getAllPosts } from './post.controller';

const postRouter = Router();
postRouter.get("/all-posts", getAllPosts);

export default postRouter;