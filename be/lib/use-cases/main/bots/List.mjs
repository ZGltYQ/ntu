import Base         from '../../Base.mjs';
import { Op }       from '../../../../packages.mjs';
import { dumpBots } from '../../utils/dumps.mjs';
import Bots         from '../../../domain-model/Bots.mjs';

const DEFAULT_LIMIT  = 20;
const DEFAULT_OFFSET = 0;

export default class BotsList extends Base {
    static validationRules = {
        search   : [ { 'min_length': 2 } ],
        limit    : [ 'positive_integer' ],
        offset   : [ 'integer', { 'min_number': 0 } ],
        sortedBy : [ { 'one_of': [ 'id', 'hostId', 'createdAt', 'updatedAt' ] } ],
        order    : [ { 'one_of': [ 'ASC', 'DESC' ] } ]
    };

    async execute({
        limit    = DEFAULT_LIMIT,
        offset   = DEFAULT_OFFSET,
        search   = '',
        sortedBy = 'updatedAt',
        order    = 'DESC'
    }) {
        const botsFields = [ 'hostId' ];
        const findQuery = search
            ? { [Op.or]: botsFields.map(field => ({ [field]: { [Op.like]: `%${ search }%` } })) }
            : {};

        const dbRequest = {
            where : findQuery,
            order : [ [ sortedBy, order ] ],
            limit,
            offset
        };

        const [ users, filteredCount, totalCount ] = await Promise.all([
            Bots.findAll(dbRequest),
            Bots.count({ where: findQuery }),
            Bots.count()
        ]);

        const data = users.map(dumpBots);

        return {
            data,
            meta : {
                totalCount,
                filteredCount,
                limit,
                offset
            }
        };
    }
}
