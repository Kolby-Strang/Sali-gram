import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentService } from "../services/CommentsService.js";

export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router

            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
    }


    async createComment(res, req, next) {
        try {
            const commentData = req.body
            commentData.
        } catch (error) {
            next(error)
        }
    }
}