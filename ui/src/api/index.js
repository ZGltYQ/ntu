import { Buffer } from 'buffer';

export default class ApiClient {
    constructor(prefix) {
        this.prefix = prefix;
    }

    async sendFiles(data){
        const response = await (await fetch(`http://212.111.203.181/${this.prefix}`, {
            method: 'POST',
            body: data
        })).json();

        if(response.status !== 1) throw new Error(response.error.code);
    
        return Buffer.from(response.buffer)
    }
}
