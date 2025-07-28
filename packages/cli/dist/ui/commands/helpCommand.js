/**
 * @license
 * Copyright 2025 Muzan Sano
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommandKind, OpenDialogActionReturn, SlashCommand } from './types.js';
export const helpCommand = {
    name: 'help',
    altNames: ['?'],
    description: 'for help on gemini-cli',
    kind: CommandKind.BUILT_IN,
    action: (_context, _args) => {
        console.debug('Opening help UI ...');
        return {
            type: 'dialog',
            dialog: 'help',
        };
    },
};
