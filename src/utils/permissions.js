
export const hasPermission = (user, permission) => {
  return Boolean(user?.permissions?.[permission]);
};
