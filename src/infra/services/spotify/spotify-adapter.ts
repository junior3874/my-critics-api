require("dotenv").config();
import axios from "axios";

import Album from "@/domain/entity/value-objects/Album";
import Music from "@/domain/entity/value-objects/Music";

import { IServiceRequestAlbum } from "@/useCases/interfaces/services/IServiceRequestAlbum";
import { IServiceRequestMusic } from "@/useCases/interfaces/services/IServiceRequestMusic";
import { IServiceSearchTrackOrAlbum } from "@/useCases/interfaces/services/IServiceSearchTrackOrAlbum";
import { IServiceRequestAudioFeatures } from "@/useCases/interfaces/services/IServiceRequestAudioFeatures";

const api = axios.create({
  headers: {
    Authorization: `Bearer 44545515`,
  },
});

export const generateAccessToken = async () => {
  const token = Buffer.from(
    process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
  ).toString("base64");

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  const res = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${token}`,
      },
    }
  );
  console.log(res.data.access_token);
  return res.data.access_token;
};

const validRequest = async (command: Function) => {
  api.interceptors.request.use(async function (config) {
    config.headers.Authorization = `Bearer ${await generateAccessToken()}`;
    return config;
  });

  return await command();
};

function SpotifyAdapter() {
  const requestMusic: IServiceRequestMusic = {
    async load(musicId: string): Promise<IServiceRequestMusic.Result> {
      try {
        const res: any = await api.get(
          `https://api.spotify.com/v1/tracks/${musicId}`
        );
        return {
          duration: res.data.duration_ms,
          image: res.data.album.images[0].url,
          linkInPlatform: res.data.external_urls.spotify,
          previewUrl: res.data.preview_url,
          author: res.data.artists[0].name,
          name: res.data.name,
        };
      } catch (err) {
        if (err.response.status == "401") {
          return validRequest(() => requestMusic.load(musicId));
        }
        return;
      }
    },
  };

  const requestAlbum: IServiceRequestAlbum = {
    async load(albumId: string): Promise<IServiceRequestAlbum.Resut> {
      try {
        const res: any = await api.get(
          `https://api.spotify.com/v1/albums/${albumId}`
        );

        return res.data;
      } catch (err) {
        if (err.response.status == "401") {
          return validRequest(() => requestAlbum.load(albumId));
        }
        return;
      }
    },
  };

  const searchTrackOrAlbum: IServiceSearchTrackOrAlbum = {
    async search(
      data: IServiceSearchTrackOrAlbum.Params
    ): Promise<IServiceSearchTrackOrAlbum.Result> {
      const res: unknown = await api
        .get(
          `https://api.spotify.com/v1/search?type=album,track&q=${data.query}`
        )
        .then((res) => res);
      return;
    },
  };

  const getAudioFeatures: IServiceRequestAudioFeatures = {
    async load(index: number): Promise<Music[]> {
      return;
    },
  };

  return { requestMusic, requestAlbum, searchTrackOrAlbum, getAudioFeatures };
}

export default SpotifyAdapter;
