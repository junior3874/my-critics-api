import Album from "@/domain/entity/value-objects/Album";
import Music from "@/domain/entity/value-objects/Music";

export interface IServiceSearchTrackOrAlbum {
  search: (query: string) => Promise<IServiceSearchTrackOrAlbum.Result>;
}

export namespace IServiceSearchTrackOrAlbum {
  type unionTypes = Music | Album | (Music & Album);
  export type Result = unionTypes[];
}
