import { CommentDocument } from '../../models/Comment';
import { Comment } from '../../server.types';
import { UserModel } from '../../models/User';
import { prepareUser } from '../../utils/prepareUser';

export const prepareComment = async (item: CommentDocument): Promise<Comment> => {
  if (!item) return null;
  const author = await UserModel.findById(item.authorId);
  return {
    id: item._id.toString(),
    content: item.content,
    postId: item.postId,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    author: prepareUser(author),
  };
};

export const prepareComments = async (items: CommentDocument[]): Promise<Comment[]> => {
  if (!items?.length) return [];

  const result: Comment[] = [];
  for await (const item of items) {
    result.push(await prepareComment(item));
  }
  return result;
};
