import { db } from "../mongoDB.ts";
import { Post } from "../../domain/Posts.ts";
import { PostRepository } from "../../domain/PostRepository.ts";

export class MongoPostRepository implements PostRepository {
  private collection = db.collection<Post>("posts");

  async create(post: Post): Promise<Post> {
    const { insertedId } = await this.collection.insertOne(post);
    return { ...post, id: insertedId.toString() };
  }

  async update(id: string, post: Partial<Post>): Promise<Post | null> {
    const { matchedCount } = await this.collection.updateOne(
      { _id: { $oid: id } },
      { $set: post }
    );
    return matchedCount ? await this.findById(id) : null;
  }

  async delete(id: string): Promise<boolean> {
    const { deletedCount } = await this.collection.deleteOne({ _id: { $oid: id } });
    return deletedCount > 0;
  }

  async findById(id: string): Promise<Post | null> {
    return await this.collection.findOne({ _id: { $oid: id } });
  }

  async findAll(): Promise<Post[]> {
    return await this.collection.find().toArray();
  }
}
