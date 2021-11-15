import Album from "@/domain/entity/value-objects/Album";
import Music from "@/domain/entity/value-objects/Music";

export interface IServiceRequestMusicOrAlbum {
  load: (musicOrAlbumUrl: string) => Promise<Music | Album>;
}
