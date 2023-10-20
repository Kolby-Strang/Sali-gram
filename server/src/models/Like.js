import { Schema } from "mongoose";

export const LikeSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    postId: { type: Schema.Types.ObjectId, required: true },
}, { timestamps: true, toJSON: { virtuals: true } })

LikeSchema.virtual('creator', {
    localField: 'userId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})