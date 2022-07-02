import { DataTypes as DT } from '../../packages.mjs';
import Base                from './Base.mjs';

class Bots extends Base {
    static schema = {
        id     : { type: DT.UUID, defaultValue: DT.UUIDV4, primaryKey: true },
        hostId : { type: DT.STRING, allowNull: false, unique: true }
    };

    static initRelations() {}

    /**
     * Implementation of findById method with additional "status" check
     * @param {String} id - String: id of User to be found
     * @param {Object} options - Object: set of flags for additional flexible User search. Could have such flags:
     * @returns {Promise<Object>} - Promise: sequelize entity of User model
     */
    static async findById(id) {
        const entity = await super.findById(id);

        return entity;
    }
}

export default Bots;
