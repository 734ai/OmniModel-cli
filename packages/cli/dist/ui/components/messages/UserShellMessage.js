import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @license
 * Copyright 2025 Muzan Sano
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { Box, Text } from 'ink';
import { Colors } from '../../colors.js';
export const UserShellMessage = ({ text }) => {
    // Remove leading '!' if present, as App.tsx adds it for the processor.
    const commandToDisplay = text.startsWith('!') ? text.substring(1) : text;
    return (_jsxs(Box, { children: [_jsx(Text, { color: Colors.AccentCyan, children: "$ " }), _jsx(Text, { children: commandToDisplay })] }));
};
