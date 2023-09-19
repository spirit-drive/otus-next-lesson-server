import { RequestHandler } from 'express-serve-static-core';
import { PostModel } from '../../models/Post';
import { preparePost } from './preparePost';
import { DataBaseError, ValidationError, ServerErrors, FieldRequiredError, NotFoundError } from '../../Errors';
import { Post, PostAddInput } from '../../server.types';
import { CategoryModel } from '../../models/Category';

export const create: RequestHandler<never, Post | ServerErrors, PostAddInput> = async (req, res) => {
  try {
    if (!req.body.categoryId) {
      return res.status(400).json(new FieldRequiredError(`categoryId is required`, 'categoryId'));
    }
    if (!(await CategoryModel.findById(req.body.categoryId))) {
      return res.status(400).json(new NotFoundError(`category not found`, 'categoryId'));
    }
    const entity = new PostModel(req.body);

    // Выполняем валидацию перед сохранением
    const validationError = entity.validateSync();
    if (validationError) {
      // Если есть ошибки валидации, отправляем ValidationError
      return res.status(400).json(new ValidationError(validationError));
    }
    // Если валидация успешна, сохраняем документ
    await entity.save();
    res.send(await preparePost(entity));
  } catch (e) {
    res.status(500).json(new DataBaseError(e));
  }
};
