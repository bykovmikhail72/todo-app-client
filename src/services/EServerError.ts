export const EServerError = {
  AuthRequired: 'auth_required',
  Internal: 'internal',
  TooManyRequests: 'too_many_requests',
  // Login
  WrongLoginData: 'wrong_login_data',
  // Register
  EmailRegistered: 'email_registered',
  CompanyRegistered: 'company_registered',
  EmailNotFound: 'wrong_email_data',
  InvalidInn: 'invalid_inn',
} as const

type TServerError = ValueOf<typeof EServerError>

export const SERVER_ERRORS_MESSAGE_MAP = {
  [EServerError.AuthRequired]: 'Ошибка, необходимо войти в аккаунт',
  [EServerError.Internal]: 'Ошибка на сервере, попробуйте позже',
  [EServerError.TooManyRequests]: 'Превышен лимит запросов',
  [EServerError.WrongLoginData]: 'Введен неверный логин или пароль',
  [EServerError.EmailRegistered]: 'Такой емейл уже зарегистрирован',
  [EServerError.EmailNotFound]: 'Данная почта не зарегистрирована в системе',
  [EServerError.CompanyRegistered]: 'Такая компания уже зарегистрирована',
  [EServerError.InvalidInn]: 'Неправильный ИНН',
}

export interface IServerErrorResponse {
  error: TServerError
}

export interface IServerError extends Error {
  name: TServerError
  message: string
}
