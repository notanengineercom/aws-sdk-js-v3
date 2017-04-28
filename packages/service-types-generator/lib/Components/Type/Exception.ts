import {Structure} from "./Structure";
import {SerializationType} from "@aws/types";

interface InnateMember {
    memberName: string;
    type: SerializationType;
    documentation: string;
}

export class Exception extends Structure {

    toString(): string {
        return `
${this.documentationFor(this.shapeName)}
export interface ${this.shapeName} {
${this.innateMembers.map(this.formatInnateMember).join('\n\n')}
${Object.keys(this.shape.members).map(this.getMemberDefinition, this).join('\n\n')}
}
        `.trim();
    }

    private get innateMembers(): InnateMember[] {
        const {members} = this.shape;
        const innateMembers: InnateMember[] = [];

        if (!('stack' in members)) {
            innateMembers.push({
                memberName: 'stack',
                type: 'string',
                documentation: '<p>A trace of which functions were called leading to this error being raised.</p>'
            });
        }

        if (!('name' in members)) {
            innateMembers.push({
                memberName: 'name',
                type: 'string',
                documentation: '<p>The species of error returned by the service.</p>',
            });
        }

        if (!('message' in members)) {
            innateMembers.push({
                memberName: 'message',
                type: 'string',
                documentation: '<p>Human-readable description of the error.</p>',
            });
        }

        return innateMembers;
    }

    private formatInnateMember(member: InnateMember): string {
        return `
/**
 * ${member.documentation}
 */
${member.memberName}?: ${member.type};
        `.trim();
    }
}
