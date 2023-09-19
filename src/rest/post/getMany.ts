import { RequestHandler } from 'express-serve-static-core';
import { PostModel } from '../../models/Post';
import { preparePosts } from './preparePost';
import { DataBaseError, ServerErrors } from '../../Errors';
import { Post, PostGetManyInput } from '../../server.types';

export const getMany: RequestHandler<never, Post[] | ServerErrors, PostGetManyInput> = async (req, res) => {
  try {
    const { name, ids } = req.body;
    const query = PostModel.find();
    if (ids?.length) {
      query.where('_id', { $in: ids });
    } else if (name) {
      query.where('name', new RegExp(name, 'i'));
    }
    const entities = await query;

    res.send(await preparePosts(entities));
  } catch (e) {
    res.status(500).json(new DataBaseError(e));
  }
};
