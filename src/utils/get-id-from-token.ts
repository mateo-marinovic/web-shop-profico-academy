export const getIdFromToken = (token: string | null): number => {
  if (!token) return 0;
  const tokenParts = token?.split("-");
  return tokenParts ? parseInt(tokenParts[tokenParts.length - 1]) : 0;
};
