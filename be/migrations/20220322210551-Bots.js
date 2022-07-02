

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.createTable('Bots', {
            id        : { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
            hostId    : { type: Sequelize.STRING, allowNull: false, unique: true },
            createdAt : { type: Sequelize.DATE, allowNull: false },
            updatedAt : { type: Sequelize.DATE, allowNull: false }
        });
    },

    down : (queryInterface) => {
        return queryInterface.dropTable('Bots');
    }
};
