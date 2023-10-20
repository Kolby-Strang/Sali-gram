import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class LikesService {
    async getLikesByPostId(postId) {
        const post = await dbContext.Post.findById(postId)
        if (!post) {
            throw new BadRequest(`Invalid post Id: ${postId}`)
        }
        const likes = await dbContext.Like.find({ postId }).populate('creator')
        return likes
    }
    async destroyLike(likeId, userId) {
        const like = await dbContext.Like.findById(likeId)
        if (!like) {
            throw new BadRequest(`Invalid LIke Id ${likeId}`)
        }
        if (like.userId != userId) {
            throw new Forbidden('User Id does not match' + userId)
        }
        await like.remove()
        return like
    }
    async createLike(likeData) {
        const like = await dbContext.Like.create(likeData)
        return like
    }

}

export const likesService = new LikesService()