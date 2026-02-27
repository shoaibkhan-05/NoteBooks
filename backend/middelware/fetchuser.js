var jwt = require("jsonwebtoken");

const JWT_SECRET = "shoaibkhan";
const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res
      .status(401)
      .send({ error: "please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res
      .status(401)
      .send({ error: "please authenticate using a valid token" });
  }
};


module.exports = fetchUser;
