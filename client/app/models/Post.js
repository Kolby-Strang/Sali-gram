export class Post {
    constructor(data) {
        this.id = data.id
        this.title = data.title
        this.body = data.body
        this.image = data.image
        this.creatorId = data.creatorId
        this.creator = data.creator
    }

    get postCardTemplate() {
        return `
    <div class="col-4 mt-2">
        <div class="lizard-card">
        <img class="img-fluid"
        src="https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?auto=format&fit=crop&q=80&w=3024&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
        <i class="mdi mdi-heart"></i>
        </div>
    </div>
    </div>
    `
    }
}