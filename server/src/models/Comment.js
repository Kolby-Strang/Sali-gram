import { Schema } from "mongoose";

export const CommentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    postId: { type: Schema.Types.ObjectId, required: true },
    body: { type: String, required: true, maxlength: 300, minlength: 1 }
}, { timestamps: true, toJSON: { virtuals: true } }
)

CommentSchema.virtual("creator", {
    localField: "userId",
    foreignField: "_id",
    ref: "Account",
    justOne: true
})