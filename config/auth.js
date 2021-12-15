const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  res.setHeader("Authorization", global.token);
  // const token = req.header("Authorization")
  const token = global.token;
  console.log("token: ", token);

  if (!token) return res.status(401).json({ msg: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;
