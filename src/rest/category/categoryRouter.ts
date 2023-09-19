import { Router } from 'express';
import { update } from './update';
import { getMany } from './getMany';
import { get } from './get';
import { create } from './create';
import { remove } from './remove';

export const categoryRouter = Router();
export const categoryRouterProtected = Router();

categoryRouter.get('/', getMany);

categoryRouter.get('/:id', get);

categoryRouterProtected.post('/', create);

categoryRouterProtected.delete('/:id', remove);

categoryRouterProtected.put('/:id', update());

categoryRouterProtected.patch('/:id', update(true));
