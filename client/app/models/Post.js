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
  }

  get postCardTemplate() {
    return `
    <div class="col-4 mt-2">
        <div class="lizard-card">
        <img class="img-fluid"
        src="${this.image}"
        alt="${this.title}">
        <div class="d-flex justify-content-between align-items-center p-4">
        <h3>${this.title}</h3>
        <div class="d-flex justify-content-end align-items-center">
            <img class="rounded-circle user-image"
            src="${this.creator.picture}"
            alt="user">
            <p class="mx-2">${this.creator.name}</p>
        </div>
        </div>
        <div class="pb-3 ps-4">
        <i class="mdi mdi-heart" ${this.likeCount} ></i>
        <p>Posted at ${this.createdAt.toLocaleDateString()}</p>
        </div>
    </div>
    </div>
    `
  }

  get activePostTemplate() {
    return `
      <div class="container-fluid">
      <section class="row">
        <div class="col-8">
          <img class="img-fluid"
            src="${this.image}"
            alt="${this.title}">
          <section class="row">
            <div class="col-12 d-flex justify-content-between align-items-center py-2">
              <h3>${this.title}</h3>
              <div class="d-flex align-items-center">
                <img class="rounded-circle user-image"
                  src="${this.creator.picture}"
                  alt="${this.creator.name}">
                <p class="ms-2">${this.creator.name}</p>
              </div>
            </div>
            <div class="col-12 py-2">
              <p>${this.body}</p>
            </div>
          </section>
        </div>

        <div class="col-4">
          <h2>Comments</h2>
          <section class="row">
            <div class="col-11 card p-2">
              <div class="d-flex justify-content-end align-items-center">
                <img class="rounded-circle user-image"
                  src="https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1608095264953-b3da19d3f997%3Fauto%3Dformat%26fit%3Dcrop%26q%3D80%26w%3D2268%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D"
                  alt="">
                <p class="ms-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis sunt eveniet consectetur
                  nisi
                  nobis dicta.</p>
              </div>
            </div>
          </section>
        </div>

      </section>
    </div>
      `
  }
}