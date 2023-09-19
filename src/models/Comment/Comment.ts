import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Comment } from '../../server.types';

export type CommentDocument = Document &
  Omit<Comment, 'id' | 'author'> & {
    authorId: string;
  };
export const CommentSchema = new mongoose.Schema<CommentDocument>(
  {
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const CommentModel = mongoose.model('Comment', CommentSchema);
