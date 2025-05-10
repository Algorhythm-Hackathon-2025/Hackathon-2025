import asyncHandler from "./asyncHandler.js";
import { validationError } from "#src/error/errors.js";

export default function validateAll(validations) {
  return asyncHandler(async (req, res, next) => {
    await Promise.all(
      validations.map(async (validation) => {
        const result = await validation.run(req);
        if (!result.isEmpty()) {
          throw validationError(result.array());
        }
      })
    );
    next();
  });
}
