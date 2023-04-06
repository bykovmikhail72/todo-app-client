import { AxiosError } from 'axios'

import {
  EServerError,
  IServerErrorResponse,
  SERVER_ERRORS_MESSAGE_MAP,
} from './EServerError'

const SERVER_ERRORS_SHOW_TOAST = [
  EServerError.Internal,
  EServerError.AuthRequired,
  EServerError.TooManyRequests,
] as const

type GenericError = Error | AxiosError<IServerErrorResponse>
export const handleError = (error: GenericError): Promise<Error> => {
  console.log(error.name, error)
  const type = (error as AxiosError<IServerErrorResponse>)?.response?.data
    ?.error
  if (type) {
    const customErr = new Error(SERVER_ERRORS_MESSAGE_MAP[type])
    customErr.name = type
    error = customErr

    if (SERVER_ERRORS_SHOW_TOAST.includes(type)) {
      // Todo show toast
      // Toast.show(customErr.message);
    }
  }
  return Promise.reject(error)
}
