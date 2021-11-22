// /blog-backend/src/blog/blog.service.ts

import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import { Post } from './interfaces/post.interface';
import { CreatePostDTO } from './dto/create-post.dto';

@Injectable()
export class BlogService {
    constructor(@InjectModel('Post') private readonly postModel:Model<Post>){ }

    //Add post to MongoDB
    async addPost(createPostDTO: CreatePostDTO): Promise<Post> { 
        const newPost = await new this.postModel(createPostDTO);
        return newPost.save();
    }

    //Get post from MongoDB
    async getPost(postID): Promise<Post> {
        const post = await this.postModel
            .findById(postID)
            .exec();
        return post;
    }

    //Get posts from MongoDB
    async getPosts(): Promise<Post[]>{
        const posts = await this.postModel.find().exec();
        return posts;
    }

    //Edit post
    async editPost(postID, createPostDTO: CreatePostDTO):Promise<Post>{
        const editedPost = await this.postModel
        .findByIdAndUpdate(postID, createPostDTO, {new: true});
        return editedPost;
    }

    //Delete post
    async deletePost(postID): Promise<any>{
        const deletedPost = await this.postModel
        .findByIdAndRemove(postID);
        return deletedPost;
    }

}
