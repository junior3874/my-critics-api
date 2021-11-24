import { IEncrypter, IDecrypter } from "@/useCases/interfaces/cryptograph";

import jwt from "jsonwebtoken";

export class JwtAdapter implements IEncrypter, IDecrypter {
  readonly secret: string;
  constructor(secret: string) {
    this.secret = secret;
  }

  async encrypt(plaintext: string): Promise<string> {
    return jwt.sign({ id: plaintext }, this.secret);
  }

  async decrypt(ciphertext: string): Promise<string> {
    return jwt.verify(ciphertext, this.secret) as any;
  }
}
