import { Controller } from "@/presentation/interfaces/Controller";
import { HttpResponse } from "@/presentation/interfaces/HTTPResponse";
import { IServiceSearchTrackOrAlbum } from "@/useCases/interfaces/services/IServiceSearchTrackOrAlbum";

export class SearchTracksController implements Controller {
  constructor(
    private readonly serviceSearchTracksOrAlbums: IServiceSearchTrackOrAlbum
  ) {}
  async handler(
    request: SearchTracksController.Request
  ): Promise<HttpResponse> {
    const searchTracks = await this.serviceSearchTracksOrAlbums.search(request);

    return {
      body: searchTracks,
      statusCode: 200,
    };
  }
}

export namespace SearchTracksController {
  export type Request = {
    index?: number;
    query: string;
  };
}
