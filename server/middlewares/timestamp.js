module.exports = (req, res, next) => {
  res.header('X-TIMESTAMP', Date.now());
  next();
};
