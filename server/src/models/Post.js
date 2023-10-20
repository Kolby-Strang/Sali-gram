import { Schema } from "mongoose";

export const PostSchema = new Schema({
    title: { type: String, required: true, maxlength: 30, minlength: 1 },
    body: { type: String, required: false, maxlength: 300 },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
    image: { type: String, maxlength: 500, required: false, default: "https://unsplash.com/photos/green-lizard-on-clear-glass-panel-izRfVtrRX30" }
}, { timestamps: true, toJSON: { virtuals: true } })

PostSchema.virtual("creator", {
    localField: "creatorId",
    foreignField: "_id",
    ref: "Account",
    justOne: true
}
)