import Hash from "@/domain/entity/types/Hash";

export interface IEncrypter {
  encrypt: (text: string) => Promise<Hash>;
}
