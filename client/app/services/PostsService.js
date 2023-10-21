import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js"
import { api } from "./AxiosService.js"


class PostsService {
    changeSortMethod(type) {
        AppState.sortMethod = type
    }
    changeSortBy(type) {
        AppState.sortBy = type
    }
    async destroyComment(commentId) {
        await api.delete(`api/comments/${commentId}`)
        const comments = AppState.comments
        const indexToDelete = comments.findIndex(comment => comment.id == commentId)
        comments.splice(indexToDelete, 1)
        AppState.emit('comments')
    }
    async destroyPost(postId) {
        await api.delete(`api/posts/${postId}`)
        const indexToDelete = AppState.posts.findIndex(post => post.id == postId)
        console.log(AppState.posts)
        if (indexToDelete == -1) {
            throw new Error('Post Id Not Found: ' + postId)
        }
        AppState.posts.splice(indexToDelete, 1)
        bootstrap.Modal.getOrCreateInstance('#activePostModal').hide()
        AppState.emit('posts')
    }
    async createPost(postData) {
        const post = await api.post('api/posts', postData)
        AppState.posts.push(new Post(post.data))
        AppState.emit('posts')
    }
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

    }
    async createComment(commentData) {
        commentData.postId = AppState.activePost.id
        const comment = await api.post('api/comments', commentData)

        AppState.comments.push(comment.data)
        AppState.emit('comments')
    }

}


export const postsService = new PostsService 