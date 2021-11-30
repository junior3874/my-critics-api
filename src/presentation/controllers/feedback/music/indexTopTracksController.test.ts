import { HttpResponse } from "@/presentation/interfaces/HTTPResponse";
import { IServiceRequestAudioFeatures } from "@/useCases/interfaces/services/IServiceRequestAudioFeatures";
import { mock } from "jest-mock-extended";
import { IndexTopTracksController } from "./indexTopTracksController";

describe("#indexTopTracksController", () => {
  const makeSut = () => {
    const indexTopTracksService = mock<IServiceRequestAudioFeatures>();
    const sut = new IndexTopTracksController(indexTopTracksService);
    return { sut, indexTopTracksService };
  };
  test("should index top tracks with sucess", async () => {
    const { indexTopTracksService, sut } = makeSut();

    const mockResFromService = [
      {
        author: "",
        duration: 15,
        linkInPlatform: "454",
        name: "11",
        previewUrl: "11",
      },
    ];

    indexTopTracksService.load.mockResolvedValue(mockResFromService);
    const res = await sut.handler({ index: 0 });

    const expectedRes: HttpResponse = {
      body: mockResFromService,
      statusCode: 200,
    };
    expect(indexTopTracksService.load).toHaveBeenCalledWith(0);
    expect(res).toEqual(expectedRes);
  });
});
