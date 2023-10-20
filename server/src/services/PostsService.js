import { dbContext } from "../db/DbContext.js"

class PostsService {
    async getPosts() {
        const posts = await dbContext.Post.find()
        return posts
    }
    async createPost(newPost) {
        const post = await dbContext.Post.create(newPost)
        return post
    }
}

export const postsService = new PostsService