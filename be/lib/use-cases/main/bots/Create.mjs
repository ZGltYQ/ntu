import {
    Exception as X
} from '../../../../packages.mjs';

import Base         from '../../Base.mjs';
import { dumpBots } from '../../utils/dumps.mjs';
import Bots         from '../../../domain-model/Bots.mjs';
import DMX          from '../../../domain-model/X.mjs';

export default class UsersCreate extends Base {
    static validationRules = {
        data : [ 'required', { 'nested_object' : {
            hostId : [ 'required', 'string' ]
        } } ]
    };

    async execute({ data }) {
        try {
            const user = await Bots.create(data);

            return { data: dumpBots(user) };
        } catch (x) {
            if (x instanceof DMX.NotUnique) {
                throw new X({
                    code   : 'NOT_UNIQUE',
                    fields : { [x.field]: 'NOT_UNIQUE' }
                });
            }

            throw x;
        }
    }
}
