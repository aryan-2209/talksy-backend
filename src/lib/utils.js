import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // For cross-site cookies (frontend hosted on a different origin) the cookie
  // must be sent with `SameSite=None` and `Secure=true` in production.
  // In development we use a more permissive SameSite to allow localhost testing
  // without HTTPS. The frontend must send requests with credentials: 'include'.
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return token;
};
