// role.js
// Define the roles and their corresponding rights
const roleRights = new Map();
roleRights.set('manager', ['createProducts', 'updateProducts','getProducts']);
roleRights.set('admin', ['createProducts', 'updateProducts','getProducts','deleteProducts']);
roleRights.set('staff', []);

export default  roleRights;
