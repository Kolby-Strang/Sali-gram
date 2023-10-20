import { AppState } from "../AppState.js"
import { Like } from "../models/Like.js"
import { api } from "./AxiosService.js"

class LikesService {

    async createLike() {
        const post = AppState.activePost
        const postData = {
            postId: post?.id
        }
        const res = await api.post('api/likes', postData)
        const newLike = new Like(res.data)
        AppState.likes.push(newLike)
        AppState.emit('likes')
    }
}

export const likesService = new LikesService 