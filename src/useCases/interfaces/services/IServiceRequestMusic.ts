import Album from "@/domain/entity/value-objects/Album";
import Music from "@/domain/entity/value-objects/Music";

export interface IServiceRequestMusic {
  load: (musicId: string) => Promise<Music>;
}
