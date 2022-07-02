/* eslint-disable more/no-c-like-loops */
import util               from 'util';
import PizZip             from 'pizzip';
import expressions        from 'angular-expressions';
import assign             from 'lodash/assign.js';
import Docxtemplater      from 'docxtemplater';
import libre              from 'libreoffice-convert';

libre.convertAsync = util.promisify(libre.convert);

expressions.filters.lower = (input) => {
    if (!input) return input;

    return input.toLowerCase();
};

function angularParser(tag) {
    const regexp = tag
        .replace(/^\.$/, 'this')
        .replace(/(’|‘)/g, "'")
        .replace(/(“|”)/g, '"');
    const expr = expressions.compile(regexp);


    return {
        get(scope, context) {
            let obj = {};
            const scopeList = context.scopeList;
            const num = context.num;

            for (let i = 0, len = num + 1; i < len; i++) {
                obj = assign(obj, scopeList[i]);
            }


            return expr(scope, obj);
        }
    };
}


export default class FileMaker {
    constructor(buffer) {
        this.zip = new PizZip(buffer);
        this.buffer = '';
    }


    get getFile() {
        return this.buffer;
    }

    convertToDocx(json = {}) {
        this.buffer = new Docxtemplater(this.zip, {
            paragraphLoop : true,
            linebreaks    : true,
            parser        : angularParser
        }).render(json).getZip().generate({ type: 'nodebuffer' });

        return this;
    }

    async asyncConvertToPdf() {
        this.buffer = await libre.convertAsync(this.buffer, '.pdf', undefined);

        return this;
    }
}
