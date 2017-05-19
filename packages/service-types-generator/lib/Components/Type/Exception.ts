import {Structure} from "./Structure";
import {SerializationType} from "@aws/types";
import {IndentedSection} from "../IndentedSection";

interface InnateMember {
    memberName: string;
    type: SerializationType;
    documentation: string;
}

export class Exception extends Structure {

    toString(): string {
        const members = this.innateMembers
            .map(this.formatInnateMember, this)
            .concat(
                Object.keys(this.shape.members)
                    .map(this.getMemberDefinition, this)
            );
        return `
${this.docBlock(this.shape.documentation)}
export interface ${this.shape.name} {
${new IndentedSection(members.join('\n\n'))}
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
${this.docBlock(member.documentation)}
${member.memberName}?: ${member.type};
        `.trim();
    }
}
