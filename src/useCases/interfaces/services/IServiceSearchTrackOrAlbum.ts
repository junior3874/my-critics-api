import Album from "@/domain/entity/value-objects/Album";
import Music from "@/domain/entity/value-objects/Music";

export interface IServiceSearchTrackOrAlbum {
  search: (
    data: IServiceSearchTrackOrAlbum.Params
  ) => Promise<IServiceSearchTrackOrAlbum.Result>;
}

export namespace IServiceSearchTrackOrAlbum {
  export type Params = {
    query: string;
    index?: number;
  };
  export type Result = {
    albuns: Album[];
    tracks: Music[];
    next: string;
    total: number;
  };
}
