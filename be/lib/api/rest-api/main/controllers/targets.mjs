import chista         from '../../chista.mjs';
import TargetList from '../../../../use-cases/main/targets/List.mjs';

export default {
    list : chista.makeUseCaseRunner(TargetList, req => req.body)
};
