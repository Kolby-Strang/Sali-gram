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

    async setActivePost(postId) {
        const foundPost = AppState.posts.find(post => post.id == postId)
        console.log(foundPost);
        if (!foundPost) {
            throw new Error(`Bad Post id ${postId}`)
        }
        AppState.activePost = foundPost
        const comments = await api.get(`api/posts/${postId}/comments`)
        AppState.comments = comments.data
        console.log(AppState.comments)
    }
}


export const postsService = new PostsService 