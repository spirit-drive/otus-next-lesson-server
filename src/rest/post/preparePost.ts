import { PostDocument } from '../../models/Post';
import { Post } from '../../server.types';
import { CategoryModel } from '../../models/Category';
import { prepareCategory } from '../category/prepareCategory';
import { UserModel } from '../../models/User';
import { prepareUser } from '../../utils/prepareUser';

export const preparePost = async (item: PostDocument): Promise<Post> => {
  if (!item) return null;
  const category = await CategoryModel.findById(item.categoryId);
  const author = await UserModel.findById(item.authorId);
  return {
    id: item._id.toString(),
    name: item.name,
    photo: item.photo,
    content: item.content,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    author: prepareUser(author),
    category: await prepareCategory(category),
  };
};

export const preparePosts = async (items: PostDocument[]): Promise<Post[]> => {
  if (!items?.length) return [];

  const result: Post[] = [];
  for await (const item of items) {
    result.push(await preparePost(item));
  }
  return result;
};
