/* eslint-disable more/no-c-like-loops */
/* istanbul ignore file */
import FileMaker from '../../../../domain-model/Files.mjs';
import Base               from '../../../Base.mjs';
import {
    Exception as X
} from '../../../../../packages.mjs';


const MIME_TYPE_RULES = { 'one_of' : [
    'image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml',
    'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',       // .doc + .docx
    // 'application/x-rar-compressed', 'application/octet-stream',                                         // .rar
    'application/json'                                                                                     // .json
    // 'application/zip', 'application/octet-stream', 'application/x-zip-compressed', 'application/x-zip', // .zip
    // 'application/pdf', 'text/plain', 'text/csv'
] };


export default class FileCreate extends Base {
    async validate(data) {
        const rules = {
            files : [ 'required', { 'list_of_objects' : [
                {
                    buffer       : [ 'required' ],
                    originalname : [ 'required' ],
                    size         : [ 'required' ],
                    mimetype     : [ 'required', MIME_TYPE_RULES || 'not_empty' ]
                }
            ] } ]

        };

        return this.doValidation(data, rules);
    }

    async execute({ files }) {
        try {
            const json = files.find(file => [ 'application/json' ].includes(file.mimetype));

            const docx = files.find(file => [ 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ].includes(file.mimetype));

            const formatJson = JSON.parse(json.buffer.toString().trim());

            const buf = new FileMaker(docx.buffer).convertToDocx(formatJson).getFile;

            return { buffer: buf };
        } catch (error) {
            throw new X({
                code   : 'FAILED_TO_DOWNLOAD',
                fields : {
                    file : error.message
                }
            });
        }
    }
}
