function errorHandler(error, req, res, next) {
  console.error(error);

  res.status(error.statusCode || 500).json({
    error: {
        message: error.message || "Internal server error",
        code: error.code || "INTERNAL_SERVER_ERROR",
        statusCode: error.statusCode || 500,
        details: error.details || null,
        timestamp: error.timestamp || new Date().toISOString(),
    } 
  });
}

module.exports = errorHandler;
