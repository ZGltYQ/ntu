import chista from '../../chista.mjs';
import Create from '../../../../use-cases/main/files/pdf/Create.mjs';

export default {
    create : chista.makeServiceRunner(Create, (req) => ({ files: req.files }))
};
