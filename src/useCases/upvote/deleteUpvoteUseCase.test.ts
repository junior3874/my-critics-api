import { mock } from "jest-mock-extended";
import { UpvoteNotFoundError } from "../errors/UpvoteNotFoundError";
import { IDeleteUpvoteRepositorie } from "../interfaces/repositories/IDeleteUpvoteRepositorie";
import { IFindUpvoteRepositorie } from "../interfaces/repositories/IFindUpvoteRepositorie";
import { DeleteUpvoteUseCase } from "./deleteUpvoteUseCase";

describe("#deleteUpvoteUseCase", () => {
  const makeSut = () => {
    const findUpvoteRepositorie = mock<IFindUpvoteRepositorie>();
    const deleteUpvoteRepositorie = mock<IDeleteUpvoteRepositorie>();
    const sut = new DeleteUpvoteUseCase(
      findUpvoteRepositorie,
      deleteUpvoteRepositorie
    );
    return { sut, findUpvoteRepositorie, deleteUpvoteRepositorie };
  };
  test("should delete upvote with sucess", async () => {
    const { sut, deleteUpvoteRepositorie, findUpvoteRepositorie } = makeSut();

    //@ts-ignore
    findUpvoteRepositorie.find.mockResolvedValue({ id: "1" });
    await sut.delete({ userId: 1, upvoteId: "1" });

    expect(deleteUpvoteRepositorie.delete).toHaveBeenLastCalledWith("1");
    expect(findUpvoteRepositorie.find).toHaveBeenCalledWith("1", 1);
  });

  test('should not delete upvote, because this upvote don"t exist, or not pertence for this user ', async () => {
    const { sut, findUpvoteRepositorie } = makeSut();

    findUpvoteRepositorie.find.mockResolvedValue(undefined);

    await expect(sut.delete({ userId: 1, upvoteId: "1" })).rejects.toThrow(
      new UpvoteNotFoundError()
    );
    expect(findUpvoteRepositorie.find).toHaveBeenCalledWith("1", 1);
  });
});
