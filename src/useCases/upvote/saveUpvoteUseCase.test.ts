import Upvote from "@/domain/entity/upvote";
import { mock } from "jest-mock-extended";
import { ISaveUpvoteRepositorie } from "../interfaces/repositories/ISaveUpvoteRepositorie";
import { IVerifyUserHasUpvotedRepositorie } from "../interfaces/repositories/IVerifyUserHasUpvotedRepositorie";
import { SaveUpvoteUseCase } from "./saveUpvoteUseCase";

describe("#saveUpvoteUseCase", () => {
  const makeSut = () => {
    const verifyUserHasUpvoted = mock<IVerifyUserHasUpvotedRepositorie>();
    const saveUpvoteRepositorie = mock<ISaveUpvoteRepositorie>();
    const sut = new SaveUpvoteUseCase(
      verifyUserHasUpvoted,
      saveUpvoteRepositorie
    );

    return { verifyUserHasUpvoted, saveUpvoteRepositorie, sut };
  };
  test("should save upvote with sucess", async () => {
    const { sut, verifyUserHasUpvoted, saveUpvoteRepositorie } = makeSut();

    jest.spyOn(Upvote, "create").mockReturnValue(
      //@ts-ignore
      new Upvote({
        type: true,
        upvoteBelongsToEntityId: "1",
        userId: 1,
        id: "3",
      })
    );

    const date = new Date();

    jest
      .spyOn(global, "Date")
      //@ts-ignore
      .mockImplementation(() => date)
      //@ts-ignore
      .mockImplementationOnce(() => date);
    saveUpvoteRepositorie.save.mockResolvedValue(true);
    const res = await sut.save({ entityId: "1", userId: 1, type: true });

    expect(Upvote.create).toHaveBeenCalledWith({
      upvoteBelongsToEntityId: "1",
      userId: 1,
      type: true,
    });

    expect(saveUpvoteRepositorie.save).toHaveBeenCalledWith({
      upvoteBelongsToEntityId: "1",
      userId: 1,
      type: true,
      date: new Date(),
      upvoteId: "3",
    });
    expect(res).toEqual({ id: "3", type: true });
  });
  test("should save upvote after change your type, because user already upvoted this entity", async () => {
    const { saveUpvoteRepositorie, verifyUserHasUpvoted, sut } = makeSut();
  });
});
