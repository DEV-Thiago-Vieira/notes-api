function errorHandler(error, req, res, next) {
  console.error(error);
  const type = (error.name || "InternalServerError")
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .toUpperCase();
    
  res.status(error.statusCode || 500).json({
    error: {
      type: type,
      message: error.message || "Internal server error",
      statusCode: error.statusCode || 500,
      details: error.details || null,
      timestamp: error.timestamp || new Date().toISOString(),
    },
  });
}

module.exports = errorHandler;
