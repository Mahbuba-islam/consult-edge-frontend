/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * Check if access token is expiring soon (within 2 minutes)
 */
export const isTokenExpiringSoon = (token: string): boolean => {
  try {
    const decoded = jwt.decode(token) as JwtPayload | null;

    if (!decoded || !decoded.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    const timeLeft = decoded.exp - currentTime;

    // Refresh if less than 2 minutes left
    return timeLeft < 120;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

/**
 * Optional utilities (same as your old project)
 */
const verifyToken = (token: string, secret: string) => {
  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return {
      success: true,
      data: decoded,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      error,
    };
  }
};

const decodedToken = (token: string) => {
  const decoded = jwt.decode(token) as JwtPayload;
  return decoded;
};

export const jwtUtils = {
  verifyToken,
  decodedToken,
};