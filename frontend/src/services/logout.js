export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("jwt-token");
  return { status: 200 };
};
