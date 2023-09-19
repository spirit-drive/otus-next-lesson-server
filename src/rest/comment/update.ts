import { RequestHandler } from 'express-serve-static-core';
import { CommentModel } from '../../models/Comment';
import { prepareComment } from './prepareComment';
import { DataBaseError, ValidationError, ServerErrors, NotFoundError } from '../../Errors';
import { Comment, CommentUpdateInput, StandardParams } from '../../server.types';
import { updateModel } from '../helpers';
import { PostModel } from '../../models/Post';

export const update: (patch?: boolean) => RequestHandler<StandardParams, Comment | ServerErrors, CommentUpdateInput> =
  (patch?: boolean) => async (req, res) => {
    try {
      const { id } = req.params;
      const entity = await CommentModel.findById(id);
      updateModel(req.body, entity, ['content', 'postId', 'authorId'], patch);
      if (!(await PostModel.findById(entity.postId))) {
        return res.status(400).json(new NotFoundError(`post not found`, 'postId'));
      }

      // Выполняем валидацию перед сохранением
      const validationError = entity.validateSync();
      if (validationError) {
        // Если есть ошибки валидации, отправляем ValidationError
        return res.status(400).json(new ValidationError(validationError));
      }
      // Если валидация успешна, сохраняем документ
      await entity.save();
      res.send(await prepareComment(entity));
    } catch (e) {
      res.status(500).json(new DataBaseError(e));
    }
  };
