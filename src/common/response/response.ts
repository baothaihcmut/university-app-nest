export class AppResponse {
  success: boolean;
  message: string;
  data: any;

  constructor(success: boolean, message: string, data: any) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
  static initResponse<T>(
    success: boolean,
    message: string,
    data: T,
  ): AppResponse {
    return new AppResponse(success, message, data);
  }
}
