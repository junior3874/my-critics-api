import { HttpResponse } from "./HTTPResponse";

export interface Controller<T = any> {
  handler(request: T): Promise<HttpResponse>;
}
