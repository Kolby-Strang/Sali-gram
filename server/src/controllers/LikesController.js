import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { likesService } from "../services/LikesService.js";

export class LikesController extends BaseController {
    constructor() {
        super('api/likes')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createLike)
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