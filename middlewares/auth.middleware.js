const jwt = require("jsonwebtoken");

/* =========================
   AUTH MIDDLEWARE
========================= */
const protect = (req, res, next) => {
  try {
    let token;

    // Expect header: Authorization: Bearer <token>
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // No token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded data to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, invalid or expired token",
    });
  }
};

module.exports = { protect };
