import { Schema } from "mongoose";

export const PostSchema = new Schema({
    title: { type: String, required: true, maxlength: 30, minlength: 1 },
    body: { type: String, required: false, maxlength: 300, default: '' },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
    image: { type: String, maxlength: 500, required: false, default: "https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?auto=format&fit=crop&q=80&w=3024&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
}, { timestamps: true, toJSON: { virtuals: true } })

PostSchema.virtual("creator", {
    localField: "creatorId",
    foreignField: "_id",
    ref: "Account",
    justOne: true
})

PostSchema.virtual("likeCount", {
    localField: "_id",
    foreignField: "postId",
    ref: "Like",
    count: true
})