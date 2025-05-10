export function statusError(status, code, extra, message) {
  let err = Error(message);
  err.code = code;
  err.status = status;
  Object.assign(err, extra);
  return err;
}
export function URLnotFound(url) {
  return statusError(404, "URL_NOT_FOUND", { url }, `URL ${url} not found.`);
}
export function validationError(errors) {
  return statusError(
    401,
    "VALIDATION_ERROR",
    { errors },
    "Failed to validate response"
  );
}
export function missingJwtError() {
  return statusError(401, "MISSING_JWT_ERROR", {}, "Missing JWT token");
}
export function invalidJwtError() {
  return statusError(401, "INVALID_JWT_ERROR", {}, "Invalid JWT token");
}
