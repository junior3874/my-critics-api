import Hash from "@/domain/entity/types/Hash";

export interface IHasher {
  hash: (plaintext: string) => Promise<Hash>;
}
