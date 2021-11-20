export class CommentDontExist extends Error {
  constructor() {
    super(`This comment Dont exist`);
    this.name = "CommentDontExist";
  }
}
