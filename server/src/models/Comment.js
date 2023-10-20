import { Schema } from "mongoose";

export const CommentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    body: { type: String, maxLength: 300, minLength: 1 }
})

