import Music from "@/domain/entity/value-objects/Music";

export interface IServiceRequestAudioFeatures {
  load: () => Promise<Music>;
}
