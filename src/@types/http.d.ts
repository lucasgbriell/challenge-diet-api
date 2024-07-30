export interface HttpError extends Error {
  code: string
  name: string
  statusCode?: number
  moreInfo?: object
}
