import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { PostSchema } from '../models/Post.js';
import { LikeSchema } from '../models/Like.js';
import { CommentSchema } from '../models/Comment.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Post = mongoose.model("Post", PostSchema)
  Like = mongoose.model('Like', LikeSchema)
  Comment = mongoose.model('Comment', CommentSchema)


}

export const dbContext = new DbContext()
