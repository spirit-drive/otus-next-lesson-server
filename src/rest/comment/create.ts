import { RequestHandler } from 'express-serve-static-core';
import { CommentModel } from '../../models/Comment';
import { prepareComment } from './prepareComment';
import { DataBaseError, ValidationError, ServerErrors, FieldRequiredError, NotFoundError } from '../../Errors';
import { Comment, CommentAddInput } from '../../server.types';
import { PostModel } from '../../models/Post';

export const create: RequestHandler<never, Comment | ServerErrors, CommentAddInput> = async (req, res) => {
  try {
    if (!req.body.postId) {
      return res.status(400).json(new FieldRequiredError(`postId is required`, 'postId'));
    }
    if (!(await PostModel.findById(req.body.postId))) {
      return res.status(400).json(new NotFoundError(`post not found`, 'postId'));
    }
    const entity = new CommentModel(req.body);

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
