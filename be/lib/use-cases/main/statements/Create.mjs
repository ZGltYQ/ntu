import {
    Exception as X
} from '../../../../packages.mjs';
import FileMaker from '../../../../domain-model/Files.mjs';
import Base         from '../../Base.mjs';
import { promises }           from 'fs'

export default class UsersCreate extends Base {
    static validationRules = {
        students : [ 'required', { 'list_of_objects' : [{
            'name' : [ 'required', 'string' ],
            'semestrNumber' : [ 'required', 'integer' ],
            'disciplineId'  : [ 'required', 'integer' ],
            'controlTypeId' : [ 'required', 'integer' ],
            'studentNumber' : [ 'required', 'string' ],
            'studentId'     : [ 'required', 'integer' ],
            'nationalMark'  : [ 'string' ]
        }] } ]
    };

    async execute(students) {
        try {   
            const docx = await promises.readFile('../../../../templates/statements/statement.docx');

            const pdf = await (new FileMaker(docx.buffer).convertToDocx({ students })).asyncConvertToPdf();

            return { buffer: pdf.getFile };
        } catch (x) {
            throw new X({
                code   : 'FAILED_TO_GENERATE_FILE',
                fields : {
                    file : error.message
                }
            });
        }
    }
}
