export class ApiError extends Error {
  constructor(message, status = 500) {
    super(message)
    this.status = status
  }

  toJSON() {
    return {
      status: this.status,
      message: this.message,
    }
  }
}

export class Forbidden extends ApiError {
  constructor(message = 'Forbidden') {
    super(message, 403)
  }
}

export class NotFound extends ApiError {
  constructor(message = 'Not Found') {
    super(message, 404)
  }
}

export class Unauthorized extends ApiError {
  constructor(message = 'Unauthorized') {
    super(message, 401)
  }
}
