import { AppState } from "../AppState.js"
import { Account } from "./Account.js"

export class Post {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.body = data.body
    this.image = data.image
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.likeCount = data.likeCount
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.comments = data.comments
  }

  get postCardTemplate() {
    return `
    <div class="col-lg-4 col-xl-3 col-md-6 col-12 mt-2">
      <div class="lizard-card">
        <div class="position-relative">
          <img class="img-fluid sally-picture"
            onclick="app.PostsController.setActivePost('${this.id}')"
            src="${this.image}"
            alt="${this.title}">
          <img class="rounded-circle user-image-absolute"
            src="${this.creator.picture}"
            alt="user">
        </div>

          <div class="row h-25 py-3 px-4 d-flex justify-content-between align-items-center">
            <div class="col-12 col-md-10">
              <p class="fs-3 word-wrap">${this.title}</p>
              <p>Posted at ${this.createdAt.toLocaleDateString()}</p>
            </div>
            <div class="col-12 col-md-2">
              <button onclick="app.LikesController.likePost('${this.id}')" class="btn btn-outline-danger">
                <i class="mdi mdi-heart">${this.likeCount}</i>
              </button>
            </div>
          </div>

      </div>
    </div>
    `
  }

  get activePostTemplate() {
    let deleteButton = ''
    // @ts-ignore
    if (AppState.account?.id == this.creatorId) deleteButton = `<button onclick="app.PostsController.destroyPost('${this.id}')" class="btn btn-danger me-4"><i class="mdi mdi-delete"></i></button>`
    return `
    <div class="modal-header">
      <h5 class="modal-title" id="createSaliModalLabel">
        <div class="d-flex justify-content-between align-items-center py-2">
          <img class="rounded-circle user-image"
            src="${this.creator.picture}"
            alt="${this.creator.name}"
            title="${this.creator.name}">
          <h3>${this.title}</h3>
        </div>
      </h5>
      <div class="d-flex align-items-center">
      ${deleteButton}
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
    </div>
    <div class="modal-body">
      <div class="container-fluid">
        <section class="row">
          <div class="col-8">
            <img class="img-fluid"
              src="${this.image}"
              alt="${this.title}">
          <section class="row">      
            <div class="col-12 py-2">
              <p>${this.body}</p>
            </div>
          </section>
        </div>
        <div class="col-4">
          <h2>Comments</h2>
          <form onsubmit="app.PostsController.createComment(event)">
            <input type="text" id="commentBody" name="body" minlength="1" maxlength="300">
            <button type="submit" class="btn btn-primary">+</button>
          </form>
          <section class="row">
            ${this.commentsTemplate}
          </section>
        </div>
      </section>
    </div>
  </div>      
`
  }

  get commentsTemplate() {
    let content = ''
    AppState.comments.forEach(comment => {

      let deleteButton = ''
      if (AppState.account?.id == comment.userId) deleteButton = `<button onclick="app.PostsController.destroyComment('${comment.id}')" class="btn"><i class=" mdi mdi-delete text-danger"></i></button>`
      content += `
    <div class="col-12 card p-2 my-1">
      <div class="d-flex align-items-center">
        <img class="rounded-circle user-image"
        src="${comment.creator.picture}"
        alt="">
        <p class="ms-2">
          ${comment.body}
        </p>
        <div>
          ${deleteButton}
        </div>
      </div>
    </div>
    `})
    return content
  }
}