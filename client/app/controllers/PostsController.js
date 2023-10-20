import { AppState } from "../AppState.js";
import { postsService } from "../services/PostsService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawActivePost() {
    const post = AppState.activePost
    setHTML('activePost', post.activePostTemplate)
    bootstrap.Modal.getOrCreateInstance('#activePostModal').show()
}

function _drawPosts() {
    const posts = AppState.posts
    let content = ''
    posts.forEach(post => content += post.postCardTemplate)
    setHTML('posts', content)
}



export class PostsController {
    constructor() {
        this.getPosts()
        AppState.on('posts', _drawPosts)
        AppState.on('comments', _drawActivePost)
    }


    async setActivePost(postId) {
        try {
            await postsService.setActivePost(postId)
        } catch (error) {
            Pop.error(error)
            console.error(error);
        }
    }

    async getPosts() {
        try {
            await postsService.getPosts()
        } catch (error) {
            Pop.error(error)
            console.error(error);
        }
    }
}