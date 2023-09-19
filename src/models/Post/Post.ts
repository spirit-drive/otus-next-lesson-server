import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Post } from '../../server.types';

export type PostDocument = Document &
  Omit<Post, 'id' | 'category' | 'author'> & {
    categoryId: string;
    authorId: string;
  };
export const PostSchema = new mongoose.Schema<PostDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    photo: String,
    content: String,
  },
  { timestamps: true }
);

export const PostModel = mongoose.model('Post', PostSchema);
