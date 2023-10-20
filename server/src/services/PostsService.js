import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class PostsService {
    async destroyPost(postToBeDestroyed, userId) {
        const destroyedPost = await dbContext.Post.findById(postToBeDestroyed)
        if (!destroyedPost) {
            throw new BadRequest(`This post could not be found: ${postToBeDestroyed}`)
        }
        if (destroyedPost.creatorId != userId) {
            throw new Forbidden(`This is not your post`)
        }
        await destroyedPost.remove()
        return destroyedPost
    }
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