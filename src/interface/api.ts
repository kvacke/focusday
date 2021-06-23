export interface HeadersType {
  [key: string]: string;
}

export interface Options {
  headers?: HeadersType;
  url: string;
  method: string;
  body?: object | null;
}
