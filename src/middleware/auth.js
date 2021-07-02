import store from '@/store';

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

const checkPermissions = (slug) => {
  // console.log(store.getters['auth/getUserAuth']);
  // const permissions = ;
  // console.log(permissions);
  return true;
}

export {
  checkPermissions,
  handleCheckRoleToShow
};