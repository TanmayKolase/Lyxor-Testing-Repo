// Very simple request logger that can leak sensitive data
function requestLogger(req, res, next) {
  console.log("[requestLogger]", {
    method: req.method,
    path: req.path,
    body: req.body, // can include passwords and other secrets
    ip: req.ip,
  });
  next();
}

module.exports = requestLogger;


