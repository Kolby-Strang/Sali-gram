import { AppState } from "../AppState.js";
import { likesService } from "../services/LikesService.js";
import { Pop } from "../utils/Pop.js";

export class LikesController {
    constructor() {
    }

    async likePost(postId) {
        try {
            await likesService.likePost(postId)
        } catch (error) {
            console.error(error);

        }
    }

}