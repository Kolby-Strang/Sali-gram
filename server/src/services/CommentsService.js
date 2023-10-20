import { dbContext } from "../db/DbContext.js"

class CommentsService {
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