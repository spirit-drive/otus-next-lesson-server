import { RequestHandler } from 'express-serve-static-core';
import { PostModel } from '../../models/Post';
import { preparePost } from './preparePost';
import { DataBaseError, NotFoundError, ServerErrors } from '../../Errors';
import { Post, StandardParams } from '../../server.types';

export const remove: RequestHandler<StandardParams, Post | ServerErrors> = async (req, res) => {
  try {
    const { id } = req.params;
    const entity = await PostModel.findByIdAndRemove(id);

    if (!entity) return res.status(500).json(new NotFoundError(`Post with id: "${id}" not found`));
    res.send(await preparePost(entity));
  } catch (e) {
    res.status(500).json(new DataBaseError(e));
  }
};
