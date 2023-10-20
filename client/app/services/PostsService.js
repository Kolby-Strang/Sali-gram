import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js"
import { api } from "./AxiosService.js"


class PostsService {
    async getPosts() {
        const res = await api.get('api/posts')
        console.log('got posts', res.data);
        const newPosts = res.data.map(pojo => new Post(pojo))
        AppState.posts = newPosts

    }
}


export const postsService = new PostsService 