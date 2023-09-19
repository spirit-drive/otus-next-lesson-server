import { RequestHandler } from 'express-serve-static-core';
import { PostDocument, PostModel } from '../../models/Post';
import { preparePost } from './preparePost';
import { DataBaseError, ValidationError, ServerErrors, NotFoundError } from '../../Errors';
import { Post, PostUpdateInput, StandardParams } from '../../server.types';
import { updateModel } from '../helpers';
import { CategoryModel } from '../../models/Category';

export const update: (patch?: boolean) => RequestHandler<StandardParams, Post | ServerErrors, PostUpdateInput> =
  (patch?: boolean) => async (req, res) => {
    try {
      const { id } = req.params;
      const entity = (await PostModel.findById(id)) as PostDocument;
      updateModel(req.body, entity, ['name', 'photo', 'categoryId', 'content', 'authorId'], patch);
      if (!(await CategoryModel.findById(entity.categoryId))) {
        return res.status(400).json(new NotFoundError(`category not found`, 'categoryId'));
      }

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
