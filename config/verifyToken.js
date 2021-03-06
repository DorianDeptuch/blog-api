function verifyToken(req, res, next) {
  const bearerHeader = req.headers["Authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
    console.log(typeof bearerHeader);
  }
}

module.exports = verifyToken;
