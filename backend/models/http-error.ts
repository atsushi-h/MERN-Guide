interface HttpError extends Error {
  code: number
}

class HttpError extends Error {
  constructor(message: string, errorCode: number) {
    super(message); // Add a "message" property
    this.code = errorCode; // Adds a "code" property
  }
}

export default HttpError;
