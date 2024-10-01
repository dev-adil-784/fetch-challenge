const errorHandler = (err, _req, res, _next) => {
  console.error(err.stack)

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    message: err.details || 'Something went wrong.',
  })
}

module.exports = errorHandler
