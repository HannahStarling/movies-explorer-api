class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message) {
    return new ApiError(400, message);
  }

  static unauthorized() {
    return new ApiError(401, 'Необходима авторизация');
  }

  static forbidden() {
    return new ApiError(403, 'Недостаточно прав!');
  }

  static notFound() {
    return new ApiError(404, 'Страница по указанному маршруту не найдена');
  }

  static conflict() {
    return new ApiError(409, 'Пользователь с таким email уже существует.');
  }

  static iternal() {
    return new ApiError(500, 'На сервере произошла ошибка');
  }
}

module.exports = { ApiError };
