// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.header("Authorization");
//   if (!authHeader)
//     return res.status(401).json({ message: "Token not provided" });

//   // "Bearer token" ise token kısmını ayır
//   const token = authHeader.split(" ")[1]; // Boşluktan sonra token gelir

//   if (!token) return res.status(401).json({ message: "Token not provided" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.user;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// export default authMiddleware;

import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Token not provided or invalid format" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }
  console.log("Auth Header:", authHeader);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    console.log("User:", decoded);
    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
