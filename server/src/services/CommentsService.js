import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentsService {
    async destroyComment(commentId, userId) {
        const comment = await dbContext.Comment.findById(commentId)
        if (!comment) {
            throw new BadRequest('Do not destroy')
        }
        if (comment.userId != userId) {
            throw new Forbidden('not ur comment to destroy')
        }

        await comment.remove()
        return (`Comment ${commentId} is destroyed`)
    }

    async createComment(commentData) {
        const comments = await dbContext.Comment.create(commentData)
        await comments.populate('creator', 'picture name')
        return comments
    }
    async getCommentsByPostId(postId) {
        const comments = await dbContext.Comment.find({ postId }).populate('creator', 'picture name')
        return comments
    }
}

export const commentsService = new CommentsService()