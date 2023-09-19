export type AuthResult = {
  token: string;
};

export type SignBody = {
  email: string;
  password: string;
};

export type ChangePasswordBody = {
  password: string;
  newPassword: string;
};

export type ChangePasswordResult = {
  success: boolean;
};

export type UpdateProfileBody = {
  name: string;
};

export type Profile = {
  id: string;
  name: string;
  email: string;
  signUpDate: unknown;
};

export type User = Omit<Profile, 'email' | 'signUpDate'>;

export type Category = {
  id: string;
  name: string;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryAddInput = Omit<Category, 'id' | 'createdAt' | 'updatedAt'>;
export type CategoryUpdateInput = Omit<Category, 'id' | 'createdAt' | 'updatedAt'>;
export type CategoryGetManyInput = Pick<Category, 'name'> & {
  ids: string[];
};

export type PostAddInput = Omit<Post, 'id' | 'createdAt' | 'category' | 'author' | 'updatedAt'> & {
  categoryId: string;
  authorId: string;
};

export type PostUpdateInput = Omit<Post, 'id' | 'createdAt' | 'category' | 'author' | 'updatedAt'> & {
  categoryId: string;
  authorId: string;
};

export type PostGetManyInput = Pick<Post, 'name'> & {
  ids: string[];
};

export type CommentAddInput = Omit<Comment, 'id' | 'createdAt' | 'author' | 'updatedAt'> & {
  authorId: string;
};

export type CommentUpdateInput = Omit<Comment, 'id' | 'createdAt' | 'author' | 'updatedAt'> & {
  authorId: string;
};

export type CommentGetManyInput = {
  authorId: string;
};

export type StandardParams = { id: string };

export type Post = {
  id: string;
  name: string;
  photo?: string;
  content: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
};

export type Comment = {
  id: string;
  content: string;
  author: User;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
};
