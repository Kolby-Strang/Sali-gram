import { AppState } from "../AppState.js"
import { Like } from "../models/Like.js"
import { Post } from "../models/Post.js"
import { api } from "./AxiosService.js"

class LikesService {
    async likePost(postId) {
        const res = await api.post('api/likes', { postId })
        const newLike = new Like(res.data)
        const index = AppState.posts.findIndex(post => post.id == newLike.postId)
        if (index == -1) {
            new Error("Invalid Post id, couldn't Like post")
        }
        const postRes = await api.get('api/posts/' + newLike.postId)
        AppState.posts[index] = new Post(postRes.data)
        console.log(AppState.posts[index])
        AppState.emit('posts')
    }
}

export const likesService = new LikesService()