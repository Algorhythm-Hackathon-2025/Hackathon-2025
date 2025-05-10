import asyncHandler from "#src/middlewares/asyncHandler.js";

export const signup = asyncHandler((req, res) => {
  console.log(req.body);
  res.json("HI");
});
