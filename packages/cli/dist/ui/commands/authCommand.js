/**
 * @license
 * Copyright 2025 Muzan Sano
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommandKind, OpenDialogActionReturn, SlashCommand } from './types.js';
export const authCommand = {
    name: 'auth',
    description: 'change the auth method',
    kind: CommandKind.BUILT_IN,
    action: (_context, _args) => ({
        type: 'dialog',
        dialog: 'auth',
    }),
};
