export class HttpError extends Error {
  public statusCode: number
  public moreInfo?: object
  constructor(status: number, message: string, moreInfo?: object) {
    super(message)
    this.statusCode = status

    if (moreInfo) this.moreInfo = moreInfo
  }
}
