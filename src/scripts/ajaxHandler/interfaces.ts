export interface IAjaxHandler {
  makeAPICall: (method: string, path: string) => Promise<any|IAjaxError>;
  get: (path: string) => Promise<any|IAjaxError>;
};

export interface IAjaxError {
  status: number;
  message: string;
};
