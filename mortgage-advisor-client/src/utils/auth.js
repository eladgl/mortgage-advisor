export const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const { exp } = JSON.parse(atob(token.split(".")[1])); // Decode the payload of the token
    const currentTime = Date.now() / 1000; // Get current time in seconds
    return exp > currentTime;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};
