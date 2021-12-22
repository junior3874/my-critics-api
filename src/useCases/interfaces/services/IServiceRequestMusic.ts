import Album from "@/domain/entity/value-objects/Album";
import Music from "@/domain/entity/value-objects/Music";

export interface IServiceRequestMusic {
  load: (musicId: string) => Promise<IServiceRequestMusic.Result>;
}

export namespace IServiceRequestMusic {
  export type Result = {
    linkInPlatform: string;
    author: string;
    previewUrl: string;
    image: string;
    duration: number;
    name: string;
  };
}
