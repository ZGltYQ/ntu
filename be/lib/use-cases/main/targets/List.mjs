import Base   from '../../Base.mjs';

export default class SessionsCheck extends Base {
    static validationRules = {
        search   : [ { 'min_length': 2 } ],
        limit    : [ 'positive_integer' ],
        offset   : [ 'integer', { 'min_number': 0 } ],
        sortedBy : [ { 'one_of': [ 'id' ] } ],
        order    : [ { 'one_of': [ 'ASC', 'DESC' ] } ]
    };

    // eslint-disable-next-line no-unused-vars
    async execute(query) {
        return {
            data : {
                urls : [ ]
            }
        };
    }
}
