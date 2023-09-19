import { Router } from 'express';
import { update } from './update';
import { getMany } from './getMany';
import { get } from './get';
import { create } from './create';
import { remove } from './remove';

export const commentRouter = Router();
export const commentRouterProtected = Router();

commentRouter.get('/', getMany);

commentRouter.get('/:id', get);

commentRouterProtected.post('/', create);

commentRouterProtected.delete('/:id', remove);

commentRouterProtected.put('/:id', update());

commentRouterProtected.patch('/:id', update(true));
