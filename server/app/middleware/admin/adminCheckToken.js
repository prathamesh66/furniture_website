const jwt = require("jsonwebtoken");

let checkAdminToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.send({
        _status: false,
        _message: "Authorization Token is Required",
      });
    }

    // Expected:
    // Authorization: Bearer TOKEN

    if (!token.startsWith("Bearer ")) {
      return res.send({
        _status: false,
        _message: "Invalid Authorization Format",
      });
    }

    token = token.split(" ")[1];

    let decoded = jwt.verify(token, process.env.TOKENKEY);

    // Check whether token belongs to admin
    if (decoded.role_type !== "admin") {
      return res.send({
        _status: false,
        _message: "Access Denied. Admin Only",
      });
    }

    req.adminID = decoded.id;

    next();
  } catch (error) {
    console.log("ADMIN CHECK TOKEN ERROR:", error.message);

    return res.send({
      _status: false,
      _message: "Invalid or Expired Token",
    });
  }
};

module.exports = {
  checkAdminToken,
};
