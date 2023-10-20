import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { likesService } from "../services/LikesService.js";

export class LikesController extends BaseController {
    constructor() {
        super('api/likes')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createLike)
            .delete('/:postId', this.destroyLike)
    }

    async destroyLike(req, res, next) {
        try {
            const postId = req.params.postId
            const userId = req.userInfo.id
            const like = await likesService.destroyLike(postId, userId)
            return res.send(like)
        } catch (error) {
            next(error)
        }
    }
    async createLike(req, res, next) {
        try {
            const userId = req.userInfo.id
            const likeData = req.body
            likeData.userId = userId
            const like = await likesService.createLike(likeData)
            return res.send(like)
        } catch (error) {
            next(error)
        }
    }


}