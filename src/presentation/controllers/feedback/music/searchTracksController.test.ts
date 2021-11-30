import Album from "@/domain/entity/value-objects/Album";
import Music from "@/domain/entity/value-objects/Music";
import { HttpResponse } from "@/presentation/interfaces/HTTPResponse";
import { IServiceSearchTrackOrAlbum } from "@/useCases/interfaces/services/IServiceSearchTrackOrAlbum";
import { mock } from "jest-mock-extended";
import { SearchTracksController } from "./searchTracksController";

describe("#searchTracksController", () => {
  const makeSut = () => {
    const searchTracksOrAlbumsService = mock<IServiceSearchTrackOrAlbum>();
    const sut = new SearchTracksController(searchTracksOrAlbumsService);
    return { sut, searchTracksOrAlbumsService };
  };
  test("should search tracks with sucess", async () => {
    const mockRespondeFromSearchTrackService = {};
    const { sut, searchTracksOrAlbumsService } = makeSut();

    const mockRes = {
      albuns: {} as Album[],
      tracks: {} as Music[],
      next: "",
      total: 1,
    };
    searchTracksOrAlbumsService.search.mockResolvedValue(mockRes);

    const res = await sut.handler({ index: 0, query: "testing url" });

    expect(searchTracksOrAlbumsService.search).toHaveBeenCalledWith({
      index: 0,
      query: "testing url",
    });

    const expectedRes: HttpResponse = {
      body: mockRes,
      statusCode: 200,
    };
    expect(res).toEqual(expectedRes);
  });
});
