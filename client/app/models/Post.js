export class Post {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.body = data.body
    this.image = data.image
    this.creatorId = data.creatorId
  }

  get postCardTemplate() {
    return `
      <div class="col-4">
        <div class="lizard-card">
          <img class="img-fluid"
            src="https://images.unsplash.com/photo-1607863002591-e1718c499b07?auto=format&fit=crop&q=80&w=3570&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Lizard">
          <div class="d-flex justify-content-between align-items-center p-4">
            <h3>Title</h3>
            <div class="d-flex justify-content-end align-items-center">
              <img class="rounded-circle user-image"
                src="https://images.unsplash.com/photo-1528274725619-40604dc7dad7?auto=format&fit=crop&q=80&w=3570&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="user">
              <p class="mx-2">username</p>
            </div>
          </div>
          <div class="pb-3 ps-4">
            <i class="mdi mdi-heart"></i>
          </div>
        </div>
      </div>
      `
  }
}