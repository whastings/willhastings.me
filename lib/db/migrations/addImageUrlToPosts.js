module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('posts', 'imageUrl', Sequelize.STRING);
  },

  down(queryInterface) {
    return queryInterface.removeColumn('posts', 'imageUrl');
  }
};
