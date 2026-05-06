module.exports = (role) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json("Not authenticated");

    if (req.user.role !== role) {
      return res.status(403).json("Forbidden");
    }

    next();
  };
};