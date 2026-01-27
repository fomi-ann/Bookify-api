
exports.requireAuth = (req, res) => {
  if (!req.session || !req.session.UserID) {
    res.status(401).send({ error: "Not authenticated" });
    return false;
  }
  return true;
};