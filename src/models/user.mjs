const users = [{id: 1, name: 'Alice'}];

export const userExists = (id) => users.some(user => user.id === id);

export const getUsers = () => users;

export const addUser = (user) => users.push(user);

