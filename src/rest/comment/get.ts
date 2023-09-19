import { RequestHandler } from 'express-serve-static-core';
import { CommentModel } from '../../models/Comment';
import { prepareComment } from './prepareComment';
import { DataBaseError, NotFoundError, ServerErrors } from '../../Errors';
import { Comment, StandardParams } from '../../server.types';

export const get: RequestHandler<StandardParams, Comment | ServerErrors> = async (req, res) => {
  try {
    const { id } = req.params;
    const entity = await CommentModel.findById(id);

    if (!entity) return res.status(500).json(new NotFoundError(`Comment with id: "${id}" not found`));
    res.send(await prepareComment(entity));
  } catch (e) {
    res.status(500).json(new DataBaseError(e));
  }
};
