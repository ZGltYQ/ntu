import chista from '../../chista.mjs';

import BotsCreate from '../../../../use-cases/main/bots/Create.mjs';
import BotsList   from '../../../../use-cases/main/bots/List.mjs';

export default {
    create : chista.makeUseCaseRunner(BotsCreate, req => req.body),
    list   : chista.makeUseCaseRunner(BotsList, req => ({ ...req.query, ...req.params }))
};
