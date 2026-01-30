const userResolver = require('./userResolver');

const resolvers = {
  Query: {
    getUser: userResolver.getUser,
    getAllUsers: userResolver.getAllUsers,
    getUserByEmail: userResolver.getUserByEmail,
    searchUsers: userResolver.searchUsers,
  },
  Mutation: {
    createUser: userResolver.createUser,
    updateUser: userResolver.updateUser,
    deleteUser: userResolver.deleteUser,
  },
};

module.exports = { resolvers };

