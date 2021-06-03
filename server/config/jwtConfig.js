export const jwtSecret = 'very-secret';
export const jwtSession = {
  session: false
};
export const ROLES = {
  user: 1, 
  admin: 2,
  name: (value) => Object.keys(ROLES).find(e=>ROLES[e]===value)
};