import { mock } from "jest-mock-extended";
import { ISaveCommentRepositorie } from "../interfaces/repositories/ISaveCommentRepositorie";
import { Comment } from "@/domain/entity/comment";
import CommentCreateUseCase from "./commentCreateUseCase";

describe("#createCommentUseCase", () => {
  const makeSut = () => {
    const saveCommentRepositorie = mock<ISaveCommentRepositorie>();
    const sut = new CommentCreateUseCase(saveCommentRepositorie);
    return { sut, saveCommentRepositorie };
  };
  test("should create comment with sucess", async () => {
    const { sut, saveCommentRepositorie } = makeSut();

    const mockComment = {
      id: "1",
      feedbackId: "1",
      message: "testing",
      userId: "testing",
    };
    jest.spyOn(Comment, "create").mockReturnValue(
      //@ts-ignore
      new Comment(mockComment)
    );

    const res = await sut.save(mockComment);

    expect(saveCommentRepositorie.save).toHaveBeenCalledWith(mockComment);
    expect(res).toEqual({ id: "1", message: "testing" });
  });
});
