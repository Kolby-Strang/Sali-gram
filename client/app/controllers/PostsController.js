import { AppState } from "../AppState.js";
import { postsService } from "../services/PostsService.js";
import { Pop } from "../utils/Pop.js";

function _drawPosts() {
    const posts = AppState.posts
    let content = ''
    posts.forEach(post => content += )
}



export class PostsController {
    constructor() {
        this.getPosts()
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