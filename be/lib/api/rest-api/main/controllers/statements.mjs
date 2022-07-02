import chista from '../../chista.mjs';
import Create from '../../../../use-cases/main/statements/Create.mjs';

export default {
    create : chista.makeServiceRunner(Create, (req) => req.body)
};
