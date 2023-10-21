import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { commentsService } from "./CommentsService.js"
import { likesService } from "./LikesService.js"

class PostsService {
    async getPostById(postId) {
        const post = await (await dbContext.Post.findById(postId))
        if (!post) {
            throw new BadRequest(`Could not find this post ${postId}`)
        }
        return post.populate("likeCount creator")
    }
    async destroyPost(postToBeDestroyed, userId) {
        const destroyedPost = await dbContext.Post.findById(postToBeDestroyed)
        if (!destroyedPost) {
            throw new BadRequest(`This post could not be found: ${postToBeDestroyed}`)
        }
        if (destroyedPost.creatorId != userId) {
            throw new Forbidden(`This is not your post`)
        }
        const orphanedLikes = await likesService.getLikesByPostId(destroyedPost.id)
        const orphanedComments = await commentsService.getCommentsByPostId(destroyedPost.id)
        for (let i = 0; i < orphanedComments.length; i++) {
            orphanedComments[i].remove()
        }
        for (let i = 0; i < orphanedLikes.length; i++) {
            orphanedLikes[i].remove()
        }
        await destroyedPost.remove()
        return destroyedPost
    }
    async getPosts() {
        const posts = await dbContext.Post.find().populate("likeCount creator")
        return posts
    }
    async createPost(newPost) {
        const post = (await dbContext.Post.create(newPost)).populate("likeCount creator")
        return post
    }
}

export const postsService = new PostsService