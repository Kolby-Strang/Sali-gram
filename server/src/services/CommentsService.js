import { dbContext } from "../db/DbContext.js"

class CommentsService {
    async getCommentsByPostId(postId) {
        const comments = await dbContext.Comment.find({ postId })
        return comments
    }
}

export const commentsService = new CommentsService()