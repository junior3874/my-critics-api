import Album from "@/domain/entity/value-objects/Album";
import Music from "@/domain/entity/value-objects/Music";
import { IServiceRequestMusic } from "./IServiceRequestMusic";

export interface IServiceRequestAlbum {
  load: (albumId: string) => Promise<IServiceRequestAlbum.Resut>;
}

export namespace IServiceRequestAlbum {
  export type Resut = {
    imageUrl: string;
    name: string;
    linkInPlatform: string;
    tracks: IServiceRequestMusic.Result[];
  };
}
