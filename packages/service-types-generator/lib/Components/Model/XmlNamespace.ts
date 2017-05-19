import {XmlNamespace as XmlNs} from "@aws/types";
import {IndentedSection} from "../IndentedSection";

export class XmlNamespace {
    constructor(private readonly ns: XmlNs) {}

    toString(): string {
        const props: Array<string> = ['prefix', 'uri']
            .map((prop: 'prefix'|'uri') => this.ns[prop] ?
                `${prop}: '${this.ns[prop]}'` : ''
            ).filter(prop => prop);
        return `
{
${new IndentedSection(props.join(',\n'))},
}
        `.trim();
    }
}
