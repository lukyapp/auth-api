export const HttpErrors = {
  // 400
  BAD_REQUEST: { statusCode: 400, errorCode: 'Bad Request' },
  UNAUTHORIZED: { statusCode: 401, errorCode: 'Unauthorized' },
  PAYMENT_REQUIRED: { statusCode: 402, errorCode: 'Payment Required' },
  FORBIDDEN: { statusCode: 403, errorCode: 'Forbidden' },
  NOT_FOUND: { statusCode: 404, errorCode: 'Not Found' },
  METHOD_NOT_ALLOWED: { statusCode: 405, errorCode: 'Method Not Allowed' },
  NOT_ACCEPTABLE: { statusCode: 406, errorCode: 'Not Acceptable' },
  PROXY_AUTHENTICATION_REQUIRED: {
    statusCode: 407,
    errorCode: 'Proxy Authentication Required',
  },
  REQUEST_TIMEOUT: { statusCode: 408, errorCode: 'Request Timeout' },
  CONFLICT: { statusCode: 409, errorCode: 'Conflict' },
  GONE: { statusCode: 410, errorCode: 'Gone' },
  LENGTH_REQUIRED: { statusCode: 411, errorCode: 'Length Required' },
  PRECONDITION_FAILED: { statusCode: 412, errorCode: 'Precondition Failed' },
  PAYLOAD_TOO_LARGE: { statusCode: 413, errorCode: 'Payload Too Large' },
  URI_TOO_LONG: { statusCode: 414, errorCode: 'URI Too Long' },
  UNSUPPORTED_MEDIA_TYPE: {
    statusCode: 415,
    errorCode: 'Unsupported Media Type',
  },
  RANGE_NOT_SATISFIABLE: {
    statusCode: 416,
    errorCode: 'Range Not Satisfiable',
  },
  EXPECTATION_FAILED: { statusCode: 417, errorCode: 'Expectation Failed' },
  IM_A_TEAPOT: { statusCode: 418, errorCode: "I'm a teapot" },
  MISDIRECTED_REQUEST: { statusCode: 421, errorCode: 'Misdirected Request' },
  UNPROCESSABLE_ENTITY: { statusCode: 422, errorCode: 'Unprocessable Entity' },
  LOCKED: { statusCode: 423, errorCode: 'Locked' },
  FAILED_DEPENDENCY: { statusCode: 424, errorCode: 'Failed Dependency' },
  TOO_EARLY: { statusCode: 425, errorCode: 'Too Early' },
  UPGRADE_REQUIRED: { statusCode: 426, errorCode: 'Upgrade Required' },
  PRECONDITION_REQUIRED: {
    statusCode: 428,
    errorCode: 'Precondition Required',
  },
  TOO_MANY_REQUESTS: { statusCode: 429, errorCode: 'Too Many Requests' },
  REQUEST_HEADER_FIELDS_TOO_LARGE: {
    statusCode: 431,
    errorCode: 'Request Header Fields Too Large',
  },
  UNAVAILABLE_FOR_LEGAL_REASONS: {
    statusCode: 451,
    errorCode: 'Unavailable For Legal Reasons',
  },
  // 500
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    errorCode: 'Internal Server Error',
  },
  NOT_IMPLEMENTED: { statusCode: 501, errorCode: 'Not Implemented' },
  BAD_GATEWAY: { statusCode: 502, errorCode: 'Bad Gateway' },
  SERVICE_UNAVAILABLE: { statusCode: 503, errorCode: 'Service Unavailable' },
  GATEWAY_TIMEOUT: { statusCode: 504, errorCode: 'Gateway Timeout' },
  HTTP_VERSION_NOT_SUPPORTED: {
    statusCode: 505,
    errorCode: 'HTTP Version Not Supported',
  },
  VARIANT_ALSO_NEGOTIATES: {
    statusCode: 506,
    errorCode: 'Variant Also Negotiates',
  },
  INSUFFICIENT_STORAGE: { statusCode: 507, errorCode: 'Insufficient Storage' },
  LOOP_DETECTED: { statusCode: 508, errorCode: 'Loop Detected' },
  NOT_EXTENDED: { statusCode: 510, errorCode: 'Not Extended' },
  NETWORK_AUTHENTICATION_REQUIRED: {
    statusCode: 511,
    errorCode: 'Network Authentication Required',
  },
} as const;

export const HttpStatus = {
  // 100
  CONTINUE: { statusCode: 100, errorCode: 'Continue' },
  SWITCHING_PROTOCOLS: { statusCode: 101, errorCode: 'Switching Protocols' },
  PROCESSING: { statusCode: 102, errorCode: 'Processing' },
  EARLY_HINTS: { statusCode: 103, errorCode: 'Early Hints' },
  // 200
  OK: { statusCode: 200, errorCode: 'OK' },
  CREATED: { statusCode: 201, errorCode: 'Created' },
  ACCEPTED: { statusCode: 202, errorCode: 'Accepted' },
  NON_AUTHORITATIVE_INFORMATION: {
    statusCode: 203,
    errorCode: 'Non-Authoritative Information',
  },
  NO_CONTENT: { statusCode: 204, errorCode: 'No Content' },
  RESET_CONTENT: { statusCode: 205, errorCode: 'Reset Content' },
  PARTIAL_CONTENT: { statusCode: 206, errorCode: 'Partial Content' },
  MULTI_STATUS: { statusCode: 207, errorCode: 'Multi-Status' },
  ALREADY_REPORTED: { statusCode: 208, errorCode: 'Already Reported' },
  IM_USED: { statusCode: 226, errorCode: 'IM Used' },
  // 300
  MULTIPLE_CHOICES: { statusCode: 300, errorCode: 'Multiple Choices' },
  MOVED_PERMANENTLY: { statusCode: 301, errorCode: 'Moved Permanently' },
  FOUND: { statusCode: 302, errorCode: 'Found' },
  SEE_OTHER: { statusCode: 303, errorCode: 'See Other' },
  NOT_MODIFIED: { statusCode: 304, errorCode: 'Not Modified' },
  USE_PROXY: { statusCode: 305, errorCode: 'Use Proxy' },
  TEMPORARY_REDIRECT: { statusCode: 307, errorCode: 'Temporary Redirect' },
  PERMANENT_REDIRECT: { statusCode: 308, errorCode: 'Permanent Redirect' },
  ...HttpErrors,
} as const;

export type ErrorKey = keyof typeof HttpErrors;
export type HttpError = (typeof HttpErrors)[ErrorKey];
