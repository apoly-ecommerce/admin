const userRolesConfig = [
  'admin', 'editor'
];

const handleCheckRoleToShow = (rolesAllow = []) => {
  if (!rolesAllow) return false;
  return rolesAllow.some(roleAllow => {
    return userRolesConfig.some(userRoleConfig => {
      return roleAllow === userRoleConfig;
    });
  });
}

export {
  handleCheckRoleToShow
};