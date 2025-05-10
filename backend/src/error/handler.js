function errorHandler(err, req, res, next) {
  if (err instanceof Error) {
    console.error(err);
    res.status(err.status ?? 500);
    res.json({ message: err.message, ...err });
  } else {
    console.error(err);
    if (res.statusCode < 400) {
      res.status(500);
      res.json(err);
    }
  }
}
export default errorHandler;
