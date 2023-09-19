import { Router } from 'express';
import { authRouter } from './authRouter';
import { protectedRouter } from './protectedRouter';
import { authentication } from '../authentication';
import { postRouter } from '../post/postRouter';
import { commentRouter } from '../comment/commentRouter';
import { categoryRouter } from '../category/categoryRouter';

export const mainRouter = Router();

mainRouter.use(authRouter);
mainRouter.use('/posts', postRouter);
mainRouter.use('/comments', commentRouter);
mainRouter.use('/categories', categoryRouter);
mainRouter.use(authentication, protectedRouter);
