import { Router } from 'express';
import { profileRouter } from '../profile/profileRouter';
import { categoryRouterProtected } from '../category/categoryRouter';
import { postRouterProtected } from '../post/postRouter';
import { commentRouterProtected } from '../comment/commentRouter';

export const protectedRouter = Router();

protectedRouter.use('/profile', profileRouter);
protectedRouter.use('/categories', categoryRouterProtected);
protectedRouter.use('/post', postRouterProtected);
protectedRouter.use('/comments', commentRouterProtected);
