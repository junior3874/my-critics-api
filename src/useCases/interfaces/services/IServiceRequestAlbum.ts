import Album from "@/domain/entity/value-objects/Album";

export interface IServiceRequestAlbum {
  load: (albumId: string) => Promise<Album>;
}
