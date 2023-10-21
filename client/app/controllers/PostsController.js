import { AppState } from "../AppState.js";
import { postsService } from "../services/PostsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawActivePost() {
  const post = AppState.activePost
  setHTML('activePost', post.activePostTemplate)
  bootstrap.Modal.getOrCreateInstance('#activePostModal').show()
}

function _drawPosts() {
  const posts = Object.assign([], AppState.posts)
  if (AppState.sortBy == 'likes') {
    if (AppState.sortMethod == 'descending') {
      // @ts-ignore
      posts.sort((postA, postB) => postB.likeCount - postA.likeCount)
    } else {
      // @ts-ignore
      posts.sort((postA, postB) => postA.likeCount - postB.likeCount)
    }
  } else {
    if (AppState.sortMethod == 'descending') {
      posts.reverse()
    }
  }

  let content = ''
  // @ts-ignore
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

  async createPost(event) {
    try {
      event.preventDefault()
      const form = event.target
      const postData = getFormData(form)
      // @ts-ignore
      if (postData.image == '') postData.image = 'https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?auto=format&fit=crop&q=80&w=3024&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      await postsService.createPost(postData)
      form.reset()
      // @ts-ignore
      bootstrap.Modal.getOrCreateInstance('#createSaliModal').hide()
      Pop.success('Post Created')
    } catch (error) {
      Pop.error(error)
      console.error(error);
    }
  }

  async destroyPost(postId) {
    try {
      const wantToDelete = await Pop.confirm('Are you sure you want to delete this post?')
      if (!wantToDelete) {
        return
      }
      await postsService.destroyPost(postId)
      Pop.success('Post Successfully Deleted')
    } catch (error) {
      Pop.error(error)
      console.error(error);
    }
  }

  async destroyComment(commentId) {
    try {
      const wantToDelete = await Pop.confirm('Are you sure you want to delete this post?')
      if (!wantToDelete) {
        return
      }
      await postsService.destroyComment(commentId)
    } catch (error) {
      Pop.error(error)
      console.error(error);
    }
  }

  async createComment(event) {
    try {
      event.preventDefault()
      const form = event.target
      const commentData = getFormData(form)
      await postsService.createComment(commentData)
    } catch (error) {
      Pop.error(error)
      console.log(error);
    }
  }

  changeSortBy(type) {
    postsService.changeSortBy(type)
    _drawPosts()
  }
  changeSortMethod(type) {
    postsService.changeSortMethod(type)
    _drawPosts()
  }
}