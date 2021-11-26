import axios from "axios";

import Album from "@/domain/entity/value-objects/Album";
import Music from "@/domain/entity/value-objects/Music";

import { IServiceRequestAlbum } from "@/useCases/interfaces/services/IServiceRequestAlbum";
import { IServiceRequestMusic } from "@/useCases/interfaces/services/IServiceRequestMusic";
import { IServiceSearchTrackOrAlbum } from "@/useCases/interfaces/services/IServiceSearchTrackOrAlbum";
import { IServiceRequestAudioFeatures } from "@/useCases/interfaces/services/IServiceRequestAudioFeatures";

const api = axios.create({
  headers: {
    Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
  },
});

function SpotifyAdapter() {
  const requestMusic: IServiceRequestMusic = {
    async load(musicId: string): Promise<Music> {
      const res: any = await api.get(
        `https://api.spotify.com/v1/tracks/${musicId}`
      );
      return {
        author: res.artists.name,
        duration: res.duration_ms,
        name: res.name,
        linkInPlatform: res.uri,
        previewUrl: res.preview_url,
      };
    },
  };

  const requestAlbum: IServiceRequestAlbum = {
    async load(albumId: string): Promise<Album> {
      const res: any = await api.get(
        `https://api.spotify.com/v1/albums/${albumId}`
      );

      const albumTracks = res.tracks.map(({}) => ({}));
      return { image: res.images[0], name: res.name, tracks: [] };
    },
  };

  const searchTrackOrAlbum: IServiceSearchTrackOrAlbum = {
    async search(query: string): Promise<IServiceSearchTrackOrAlbum.Result> {
      const res: unknown = await api
        .get(`https://api.spotify.com/v1/search?type=album,track&q=${query}`)
        .then((res) => res);
      return;
    },
  };

  const getAudioFeatures: IServiceRequestAudioFeatures = {
    async load(): Promise<Music> {
      return;
    },
  };

  return { requestMusic, requestAlbum, searchTrackOrAlbum, getAudioFeatures };
}

export default SpotifyAdapter;
