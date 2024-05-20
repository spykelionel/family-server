class Response {
  constructor(statusCode, httpStatus, message, data = {}) {
    this.statusCode = statusCode;
    this.timeStamp = new Date().toLocaleString();
    this.httpStatus = httpStatus;
    this.message = message;
    this.data = data;
  }
}

export const HttpStatus = {
  OK: { code: 200, status: "OK" },
  CREATED: { code: 201, status: "CREATED" },
  NO_CONTENT: { code: 204, status: "NO_CONTENT" },
  BAD_REQUEST: { code: 400, status: "BAD_REQUEST" },
  UNAUTHORIZED: { code: 401, status: "UNAUTHORIZED" },
  FORBIDDEN: { code: 403, status: "FORBIDDEN" },
  NOT_FOUND: { code: 404, status: "NOT_FOUND" },
  CONFLICTS: { code: 409, status: "RESOURCE_ALREADY_EXIST" },
  INTERNAL_SERVER_ERROR: { code: 500, status: "INTERNAL_SERVER_ERROR" },
  UNIMPLEMENTED_ERROR: { code: 501, status: "UNIMPLEMENTED" },
  SERVICE_UNAVAILABLE: { code: 503, status: "SERVICE_UNAVAILABLE" },
};

export const NOTFOUND = (req, res, data = {}) => {
  return res
    .status(HttpStatus.NOT_FOUND.code)
    .send(
      new Response(
        HttpStatus.NOT_FOUND.code,
        HttpStatus.NOT_FOUND.status,
        "Not found",
        data
      )
    );
};

export const InternalServerError = (req, res, err, data = {}) => {
  return res
    .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
    .send(
      new Response(
        HttpStatus.INTERNAL_SERVER_ERROR.code,
        HttpStatus.INTERNAL_SERVER_ERROR.status,
        `Error occured: ${HttpStatus.INTERNAL_SERVER_ERROR.status}. ${err}`,
        data
      )
    );
};

export const UnimplementedError = (req, res, err, data = {}) => {
  return res
    .status(HttpStatus.UNIMPLEMENTED_ERROR.code)
    .send(
      new Response(
        HttpStatus.UNIMPLEMENTED_ERROR.code,
        HttpStatus.UNIMPLEMENTED_ERROR.status,
        `Error occured: ${HttpStatus.UNIMPLEMENTED_ERROR.status}. ${err}`,
        data
      )
    );
};

export const ServiceUnavailableError = (req, res, err, data = {}) => {
  return res
    .status(HttpStatus.SERVICE_UNAVAILABLE.code)
    .send(
      new Response(
        HttpStatus.SERVICE_UNAVAILABLE.code,
        HttpStatus.SERVICE_UNAVAILABLE.status,
        `Error occured: ${HttpStatus.SERVICE_UNAVAILABLE.status}. ${err}`,
        data
      )
    );
};

export const UnauthorizedError = (req, res, err, data = {}) => {
  return res
    .status(HttpStatus.UNAUTHORIZED.code)
    .send(
      new Response(
        HttpStatus.UNAUTHORIZED.code,
        HttpStatus.UNAUTHORIZED.status,
        `Error occured: ${HttpStatus.UNAUTHORIZED.status}. ${err}`,
        data
      )
    );
};

export const ForbiddenError = (req, res, err, data = {}) => {
  return res
    .status(HttpStatus.FORBIDDEN.code)
    .send(
      new Response(
        HttpStatus.FORBIDDEN.code,
        HttpStatus.FORBIDDEN.status,
        `Error occured: ${HttpStatus.FORBIDDEN.status}. ${err}`,
        data
      )
    );
};

export const ResourceExist = (req, res, err, data = {}) => {
  return res
    .status(HttpStatus.CONFLICTS.code)
    .send(
      new Response(
        HttpStatus.CONFLICTS.code,
        HttpStatus.CONFLICTS.status,
        `Error occured: ${HttpStatus.CONFLICTS.status}. ${err}`,
        data
      )
    );
};

export const NotFound = (req, res, err, data = {}) => {
  return res
    .status(HttpStatus.NOT_FOUND.code)
    .send(
      new Response(
        HttpStatus.NOT_FOUND.code,
        HttpStatus.NOT_FOUND.status,
        `Error occured: ${HttpStatus.NOT_FOUND.status}. ${err}`,
        data
      )
    );
};
