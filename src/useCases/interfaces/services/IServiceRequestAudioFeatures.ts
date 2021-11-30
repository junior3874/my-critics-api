import Music from "@/domain/entity/value-objects/Music";

export interface IServiceRequestAudioFeatures {
  load: (index?: number) => Promise<Music[]>;
}
