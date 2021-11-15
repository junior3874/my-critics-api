import { Comment } from "@/domain/entity/comment";
import { NewMessageSameOldMessage } from "@/domain/entity/errors/NewMessageSameOldMessage";
import { CommentDontExist } from "@/presentation/errors";
import { mock } from "jest-mock-extended";
import { ILoadCommentRepositorie } from "../interfaces/repositories/ILoadCommentRepositorie";
import { IUpdateCommentRepositorie } from "../interfaces/repositories/IUpdateCommentRepositorie";
import { UpdateCommentUseCase } from "./commentUpdateUseCase";

describe("#commentUpdateUseCase", () => {
  const makeSut = () => {
    const loadCommentRepositorie = mock<ILoadCommentRepositorie>();
    const updateCommentRepositorie = mock<IUpdateCommentRepositorie>();
    const sut = new UpdateCommentUseCase(
      loadCommentRepositorie,
      updateCommentRepositorie
    );
    return { sut, updateCommentRepositorie, loadCommentRepositorie };
  };

  test("should update comment with sucess", async () => {
    const { sut, loadCommentRepositorie, updateCommentRepositorie } = makeSut();

    const mockComment = {
      id: "1",
      message: "testingss",
      userId: "1",
      feedbackId: "1",
    };

    loadCommentRepositorie.load.mockResolvedValue(mockComment);

    jest
      .spyOn(Comment.prototype, "updateMessage")
      .mockImplementation(function (message: string) {
        this.message = message;
      });
    const res = await sut.update({
      userId: "1",
      message: "testing",
      commentId: "1",
    });
    expect(res).toEqual({ message: "testing" });
    expect(loadCommentRepositorie.load).toHaveBeenCalledWith("1");
    expect(updateCommentRepositorie.update).toHaveBeenCalledWith({
      commentId: "1",
      message: "testing",
    });
    expect(Comment.prototype.updateMessage).toHaveBeenCalledWith("testing");
  });

  test("should not update comment, because comment dont exist", async () => {
    const { sut, loadCommentRepositorie, updateCommentRepositorie } = makeSut();

    const mockComment = {
      id: "1",
      message: "testingss",
      userId: "1",
      feedbackId: "1",
    };

    loadCommentRepositorie.load.mockResolvedValue(undefined);
    try {
      const res = await sut.update({
        userId: "1",
        message: "testing",
        commentId: "1",
      });
      expect(true).toBeFalsy();
    } catch (err) {
      expect(err).toBeInstanceOf(CommentDontExist);
    }
    // expect(res).toEqual({ message: "testing" });
  });
  test("should not update comment, because this message is same old message", async () => {
    const { sut, loadCommentRepositorie, updateCommentRepositorie } = makeSut();

    const mockComment = {
      id: "1",
      message: "testingss",
      userId: "1",
      feedbackId: "1",
    };

    jest.spyOn(Comment.prototype, "updateMessage").mockImplementation(() => {
      throw new NewMessageSameOldMessage();
    });

    loadCommentRepositorie.load.mockResolvedValue(mockComment);
    try {
      await sut.update({
        userId: "1",
        message: "testingss",
        commentId: "1",
      });
      expect(true).toBeFalsy();
    } catch (err) {
      expect(err).toBeInstanceOf(NewMessageSameOldMessage);
    }
    // expect(res).toEqual({ message: "testing" });
  });
});
