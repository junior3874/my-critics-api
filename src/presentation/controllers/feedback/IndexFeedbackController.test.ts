import { ILoadFeedbacksRepositorie } from "@/useCases/interfaces/repositories";

import { User } from "@/domain/entity/user";
import Music from "@/domain/entity/value-objects/Music";
import { HttpResponse } from "@/presentation/interfaces/HTTPResponse";
import { mock } from "jest-mock-extended";
import { IndexFeedbackController } from "./IndexFeedbackController";

describe("IndexFeedbackController", () => {
  const makeSut = () => {
    // const loadMusicOrAlbumService = mock<IServiceRequestMusicOrAlbum>();
    const loadFeedbacksRepository = mock<ILoadFeedbacksRepositorie>();

    // const loadUserPreviewRepository = mock<ILoadPreviewUser>();
    // const loadTotalUpvotesInFeedbackRepository =
    //   mock<ILoadTotalUpvotedInFeedbackRepository>();
    // const loadTotalCommentsInFeedbackRepository =
    //   mock<ILoadTotalCommentsInFeedbackRepository>();

    const sut = new IndexFeedbackController(loadFeedbacksRepository);
    return {
      sut,
      loadFeedbacksRepository,
    };
  };
  test("should index feedback with sucess", async () => {
    const { loadFeedbacksRepository, sut } = makeSut();

    // @ts-ignore
    const mockResponseInFeedbackRepository = [
      {
        comments: 0,
        id: "1",
        message: "testing message",
        musicOrAlbumId: "1",
        upvotes: {
          positives: 0,
          negatives: 0,
        },
        user: {} as User,
      },
    ];

    loadFeedbacksRepository.load.mockResolvedValue(
      // @ts-ignore
      mockResponseInFeedbackRepository
    );

    const expectedResponse: HttpResponse = {
      body: mockResponseInFeedbackRepository,
      statusCode: 202,
    };
    const res = await sut.handler({ page: 1 });

    expect(loadFeedbacksRepository.load).toHaveBeenLastCalledWith(1);
    expect(res).toEqual(expectedResponse);
  });

  test("should index feedback with sucess, but feedbacks dont have content", async () => {
    const { loadFeedbacksRepository, sut } = makeSut();

    loadFeedbacksRepository.load.mockResolvedValue([]);

    const res = await sut.handler({ page: 1 });

    const expectedResponse: HttpResponse = {
      statusCode: 204,
      body: [],
    };
    expect(res).toEqual(expectedResponse);
  });
});
