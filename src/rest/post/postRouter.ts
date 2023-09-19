import { Router } from 'express';
import { update } from './update';
import { getMany } from './getMany';
import { get } from './get';
import { create } from './create';
import { remove } from './remove';

export const postRouter = Router();

postRouter.get('/', getMany);

postRouter.get('/:id', get);

export const postRouterProtected = Router();

postRouterProtected.post('/', create);

postRouterProtected.delete('/:id', remove);

postRouterProtected.put('/:id', update());

postRouterProtected.patch('/:id', update(true));
