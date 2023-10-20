import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { postsService } from "../services/PostsService.js";

export class PostsController extends BaseController {
    constructor() {
        super('api/posts')
        this.router
            .get('', this.getPosts)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createPost)
    }
    async createPost(req, res, next) {
        try {
            const newPost = req.body
            const creatorId = req.userInfo.id
            newPost.creatorId = creatorId
            const post = await postsService.createPost(newPost)
            return res.send(post)
        } catch (error) {
            next(error)
        }
    }
    async getPosts(req, res, next) {
        try {
            const posts = await postsService.getPosts()
            return res.send(posts)
        } catch (error) {
            next(error)
        }
    }
}