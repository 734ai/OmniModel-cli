import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @license
 * Copyright 2025 Muzan Sano
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { Text, Box } from 'ink';
import { MarkdownDisplay } from '../../utils/MarkdownDisplay.js';
import { Colors } from '../../colors.js';
export const GeminiMessage = ({ text, isPending, availableTerminalHeight, terminalWidth, }) => {
    const prefix = '✦ ';
    const prefixWidth = prefix.length;
    return (_jsxs(Box, { flexDirection: "row", children: [_jsx(Box, { width: prefixWidth, children: _jsx(Text, { color: Colors.AccentPurple, children: prefix }) }), _jsx(Box, { flexGrow: 1, flexDirection: "column", children: _jsx(MarkdownDisplay, { text: text, isPending: isPending, availableTerminalHeight: availableTerminalHeight, terminalWidth: terminalWidth }) })] }));
};
