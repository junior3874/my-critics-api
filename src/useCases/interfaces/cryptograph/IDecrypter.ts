import Hash from "@/domain/entity/types/Hash";

export interface IDecrypter {
  decrypt: (text: Hash) => Promise<string>;
}
