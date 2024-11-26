import { Post } from "./Posts.ts";

export interface PostRepository {
  create(post: Post): Promise<Post>;
  update(id: string, post: Partial<Post>): Promise<Post | null>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<Post | null>;
  findAll(): Promise<Post[]>;
}
