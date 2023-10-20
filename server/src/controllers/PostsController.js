import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { postsService } from "../services/PostsService.js";
import { likesService } from "../services/LikesService.js";

export class PostsController extends BaseController {
    constructor() {
        super('api/posts')
        this.router
            .get('', this.getPosts)
            .get('/:postId', this.getPostById)
            .get('/:postId/likes', this.getLikesByPostId)

            .use(Auth0Provider.getAuthorizedUserInfo)

            .post('', this.createPost)
            .delete('/:postId', this.destroyPost)
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
    async getPostById(req, res, next) {
        try {
            const postId = req.params.postId
            const post = await postsService.getPostById(postId)
            return res.send(post)
        } catch (error) {
            next(error)
        }
    }
    // TODO put function for posts as a stretch goal
    async destroyPost(req, res, next) {
        try {
            const postToBeDestroyed = req.params.postId
            const userId = req.userInfo.id
            const post = await postsService.destroyPost(postToBeDestroyed, userId)
            return res.send(post)
        } catch (error) {
            next(error)
        }
    }

    async getLikesByPostId(req, res, next) {
        try {
            const postId = req.params.postId
            const likes = await likesService.getLikesByPostId(postId)
            return res.send(likes)
        } catch (error) {
            next(error)
        }
    }
}