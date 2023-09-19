import { RequestHandler } from 'express-serve-static-core';
import { CommentModel } from '../../models/Comment';
import { prepareComments } from './prepareComment';
import { DataBaseError, ServerErrors } from '../../Errors';
import { Comment, CommentGetManyInput } from '../../server.types';

export const getMany: RequestHandler<never, Comment[] | ServerErrors, CommentGetManyInput> = async (req, res) => {
  try {
    const { authorId } = req.body;
    const entities = await CommentModel.find({ authorId });

    res.send(await prepareComments(entities));
  } catch (e) {
    res.status(500).json(new DataBaseError(e));
  }
};
