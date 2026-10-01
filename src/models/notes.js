class Notes {
  constructor({ id, content, userId, createdAt, updatedAt }) {
    this.id = id;
    this.content = content;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Notes;
