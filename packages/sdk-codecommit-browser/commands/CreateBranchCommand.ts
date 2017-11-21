import * as __aws_middleware_content_length from '@aws/middleware-content-length';
import * as __aws_middleware_stack from '@aws/middleware-stack';
import * as __aws_types from '@aws/types';
import * as __aws_util_body_length_browser from '@aws/util-body-length-browser';
import {CreateBranch} from '../model/CreateBranch';
import {CreateBranchInput} from '../types/CreateBranchInput';
import {CreateBranchOutput} from '../types/CreateBranchOutput';
import {CodeCommitResolvedConfiguration} from '../CodeCommitConfiguration';

export class CreateBranchCommand implements __aws_types.Command<
    CreateBranchInput,
    CreateBranchOutput,
    CodeCommitResolvedConfiguration,
    ReadableStream
> {

    constructor(readonly input: CreateBranchInput) {}

    resolveMiddleware(
        clientStack: __aws_middleware_stack.MiddlewareStack<CreateBranchInput, CreateBranchOutput, ReadableStream>,
        configuration: CodeCommitResolvedConfiguration
    ): __aws_types.Handler<CreateBranchInput, CreateBranchOutput, ReadableStream> {
        const {
            handler: Handler,
            httpHandler
        } = configuration;
        const stack = clientStack.clone();

        const handlerExecutionContext: __aws_types.HandlerExecutionContext = {
            logger: {} as any,
            model: CreateBranch
        };

        const contentLengthTag = new Set();
        contentLengthTag.add('SET_CONTENT_LENGTH');
        stack.add(
            class extends __aws_middleware_content_length.ContentLengthMiddleware {
                constructor(
                    next: __aws_types.Handler<any, any, any>
                ) {
                    super(
                        __aws_util_body_length_browser.calculateBodyLength,
                        next
                    );
                }
            },
            {
                step: 'build',
                tags: contentLengthTag,
                priority: 80
            }
        );

        const coreHandler = new Handler(handlerExecutionContext);
        return stack.resolve(coreHandler, handlerExecutionContext);
    }
}