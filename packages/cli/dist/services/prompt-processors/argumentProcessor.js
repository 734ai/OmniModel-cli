/**
 * @license
 * Copyright 2025 Muzan Sano
 * SPDX-License-Identifier: Apache-2.0
 */
import { IPromptProcessor, SHORTHAND_ARGS_PLACEHOLDER } from './types.js';
import { CommandContext } from '../../ui/commands/types.js';
/**
 * Replaces all instances of `{{args}}` in a prompt with the user-provided
 * argument string.
 */
export class ShorthandArgumentProcessor {
    async process(prompt, context) {
        return prompt.replaceAll(SHORTHAND_ARGS_PLACEHOLDER, context.invocation.args);
    }
}
/**
 * Appends the user's full command invocation to the prompt if arguments are
 * provided, allowing the model to perform its own argument parsing.
 */
export class DefaultArgumentProcessor {
    async process(prompt, context) {
        if (context.invocation.args) {
            return `${prompt}\n\n${context.invocation.raw}`;
        }
        return prompt;
    }
}
